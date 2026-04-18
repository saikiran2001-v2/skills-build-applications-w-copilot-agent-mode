import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setActivities(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities: error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="container my-4"><div className="spinner-border" role="status" /></div>;
  if (error) return <div className="container my-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-body">
          <h2 className="h4 card-title mb-3">Activities</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted">No activities found.</td></tr>
                ) : activities.map((a, i) => (
                  <tr key={a._id || i}>
                    <td>{i + 1}</td>
                    <td>{a.username || a.user || '—'}</td>
                    <td>{a.activity_type || a.type || '—'}</td>
                    <td>{a.duration || '—'}</td>
                    <td>{a.date ? new Date(a.date).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
