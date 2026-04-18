import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setEntries(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: error', err);
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
          <h2 className="h4 card-title mb-3">Leaderboard</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted">No entries found.</td></tr>
                ) : entries.map((e, i) => (
                  <tr key={e._id || i}>
                    <td>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </td>
                    <td>{e.username || e.user || '—'}</td>
                    <td><span className="badge bg-primary rounded-pill">{e.score || e.total || 0}</span></td>
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

export default Leaderboard;
