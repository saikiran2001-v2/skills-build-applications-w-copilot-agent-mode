import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src={logo} alt="OctoFit logo" className="App-logo-small" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
              aria-controls="navMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="container my-4">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <img src={logo} alt="OctoFit logo" style={{ height: 80 }} className="mb-3" />
                    <h1 className="h3">Welcome to OctoFit Tracker</h1>
                    <p className="text-muted mb-4">Track your fitness activities, join teams, and climb the leaderboard.</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <NavLink className="btn btn-primary" to="/activities">Activities</NavLink>
                      <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
                      <NavLink className="btn btn-outline-secondary" to="/teams">Teams</NavLink>
                      <NavLink className="btn btn-outline-secondary" to="/users">Users</NavLink>
                      <NavLink className="btn btn-outline-secondary" to="/workouts">Workouts</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
