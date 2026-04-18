"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

import os

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    api_host = f"{codespace_name}-8000.app.github.dev"
    api_scheme = 'https'
    api_port = '443'
else:
    api_host = 'localhost:8000'
    api_scheme = 'http'
    api_port = '8000'


def api_root(request, format=None):
    request.META['HTTP_HOST'] = api_host
    request.META['SERVER_NAME'] = api_host.split(':', 1)[0]
    request.META['SERVER_PORT'] = api_port
    request.META['wsgi.url_scheme'] = api_scheme
    request.META['HTTP_X_FORWARDED_PROTO'] = api_scheme
    request.__dict__.pop('_current_scheme_host', None)
    return views.api_root(request, format=format)


router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'teams', views.TeamViewSet, basename='team')
router.register(r'activities', views.ActivityViewSet, basename='activity')
router.register(r'workouts', views.WorkoutViewSet, basename='workout')
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
    path('', api_root),
]
