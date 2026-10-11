import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBase}/api/leaderboard/`);
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        if (active) {
          setScores(data);
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

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <section className="card shadow-sm"><div className="card-body">Loading leaderboard...</div></section>;
  }

  if (error) {
    return <section className="alert alert-danger">Unable to load leaderboard: {error}</section>;
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {scores.map((item, index) => (
            <li key={item._id ?? `${item.user?.name ?? 'user'}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>#{item.rank ?? index + 1}</strong>
                <div className="text-muted">{item.user?.name ?? 'Unknown user'}</div>
              </div>
              <span className="badge bg-success rounded-pill">{item.score ?? 0} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
