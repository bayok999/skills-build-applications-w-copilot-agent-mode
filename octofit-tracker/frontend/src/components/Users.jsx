import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch(`${apiBase}/api/users/`);
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        if (active) {
          setUsers(data);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <section className="card shadow-sm"><div className="card-body">Loading users...</div></section>;
  }

  if (error) {
    return <section className="alert alert-danger">Unable to load users: {error}</section>;
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Users</h2>
        <ul className="list-group list-group-flush">
          {users.map((user, index) => (
            <li key={user._id ?? `${user.email ?? 'user'}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{user.name}</strong>
                <div className="text-muted">{user.email}</div>
              </div>
              <span className="badge bg-secondary rounded-pill">{user.fitnessLevel ?? 'Active'}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
