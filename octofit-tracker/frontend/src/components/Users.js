import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        setUsers(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Users: error', err);
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
          <h2 className="h4 card-title mb-3">Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted">No users found.</td></tr>
                ) : users.map((u, i) => (
                  <tr key={u._id || i}>
                    <td>{i + 1}</td>
                    <td>{u.username || '—'}</td>
                    <td>{u.email || '—'}</td>
                    <td>{u.age || '—'}</td>
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

export default Users;
