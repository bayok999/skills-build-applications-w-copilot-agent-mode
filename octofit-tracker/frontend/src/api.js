const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiEndpoints = {
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  teams: '/api/teams/',
  users: '/api/users/',
  workouts: '/api/workouts/',
};

export function normalizeApiData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
}

export async function fetchApi(path) {
  const response = await fetch(`${apiBase}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeApiData(payload);
}

export { apiBase };
