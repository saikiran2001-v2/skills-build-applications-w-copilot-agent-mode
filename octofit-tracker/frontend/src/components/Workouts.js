import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setWorkouts(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts: error', err);
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
          <h2 className="h4 card-title mb-3">Workouts</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted">No workouts found.</td></tr>
                ) : workouts.map((w, i) => (
                  <tr key={w._id || i}>
                    <td>{i + 1}</td>
                    <td>{w.name || '—'}</td>
                    <td>{w.description || '—'}</td>
                    <td>{w.duration || '—'}</td>
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

export default Workouts;
