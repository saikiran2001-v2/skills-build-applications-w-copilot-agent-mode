import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setTeams(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Teams: error', err);
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
          <h2 className="h4 card-title mb-3">Teams</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted">No teams found.</td></tr>
                ) : teams.map((t, i) => (
                  <tr key={t._id || i}>
                    <td>{i + 1}</td>
                    <td>{t.name || '—'}</td>
                    <td>
                      {Array.isArray(t.members)
                        ? t.members.join(', ')
                        : (t.members || '—')}
                    </td>
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

export default Teams;
