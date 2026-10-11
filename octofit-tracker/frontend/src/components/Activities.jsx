import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch(`${apiBase}/api/activities/`);
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        if (active) {
          setActivities(data);
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

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <section className="card shadow-sm"><div className="card-body">Loading activities...</div></section>;
  }

  if (error) {
    return <section className="alert alert-danger">Unable to load activities: {error}</section>;
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>
        <ul className="list-group list-group-flush">
          {activities.map((item, index) => (
            <li key={item._id ?? `${item.type}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.type}</strong>
                  <div className="text-muted">{item.user?.name ?? 'Unknown user'}</div>
                </div>
                <span className="badge bg-primary rounded-pill">{item.durationMinutes ?? 0} min</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
