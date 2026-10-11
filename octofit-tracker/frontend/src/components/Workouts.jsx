import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBase}/api/workouts/`);
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : [];

        if (active) {
          setWorkouts(data);
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

    loadWorkouts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <section className="card shadow-sm"><div className="card-body">Loading workouts...</div></section>;
  }

  if (error) {
    return <section className="alert alert-danger">Unable to load workouts: {error}</section>;
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        <ul className="list-group list-group-flush">
          {workouts.map((workout, index) => (
            <li key={workout._id ?? `${workout.name}-${index}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{workout.name}</strong>
                  <div className="text-muted">{workout.focusArea}</div>
                </div>
                <span className="badge bg-warning text-dark rounded-pill">{workout.durationMinutes ?? 0} min</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
