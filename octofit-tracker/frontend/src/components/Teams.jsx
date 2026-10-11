import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const response = await fetch(`${apiBase}/api/teams/`);
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        if (active) {
          setTeams(data);
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

    loadTeams();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <section className="card shadow-sm"><div className="card-body">Loading teams...</div></section>;
  }

  if (error) {
    return <section className="alert alert-danger">Unable to load teams: {error}</section>;
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.map((team, index) => (
            <li key={team._id ?? `${team.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{team.name}</strong>
                  <div className="text-muted">{team.description ?? 'No description available'}</div>
                </div>
                <span className="badge bg-info rounded-pill">{team.members?.length ?? 0} members</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
