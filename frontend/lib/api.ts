const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type RequestOptions = {
  method?: string;
  body?: unknown;
  deviceId?: string | null;
};

async function request(path: string, options: RequestOptions = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (options.deviceId) {
    headers["x-device-id"] = options.deviceId;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getMovies(params: Record<string, string | number | undefined>) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") qs.set(k, String(v));
    });
    return request(`/movies?${qs.toString()}`);
  },
  getMovie(id: string) {
    return request(`/movies/${id}`);
  },
  getRecommendations(id: string) {
    return request(`/movies/${id}/recommendations`);
  },
  getGenres() {
    return request(`/genres`);
  },
  getPhases() {
    return request(`/phases`);
  },
  getFavorites(deviceId: string) {
    return request(`/favorites`, { deviceId });
  },
  addFavorite(deviceId: string, movieId: string) {
    return request(`/favorites/${movieId}`, { method: "POST", deviceId });
  },
  removeFavorite(deviceId: string, movieId: string) {
    return request(`/favorites/${movieId}`, { method: "DELETE", deviceId });
  },
  getPlaylists(deviceId: string) {
    return request(`/playlists`, { deviceId });
  },
  createPlaylist(deviceId: string, name: string) {
    return request(`/playlists`, { method: "POST", deviceId, body: { name } });
  },
  updatePlaylist(deviceId: string, id: string, name: string) {
    return request(`/playlists/${id}`, { method: "PATCH", deviceId, body: { name } });
  },
  deletePlaylist(deviceId: string, id: string) {
    return request(`/playlists/${id}`, { method: "DELETE", deviceId });
  },
  getPlaylistItems(deviceId: string, id: string) {
    return request(`/playlists/${id}/items`, { deviceId });
  },
  addPlaylistItem(deviceId: string, id: string, movieId: string) {
    return request(`/playlists/${id}/items`, { method: "POST", deviceId, body: { movieId } });
  },
  removePlaylistItem(deviceId: string, id: string, movieId: string) {
    return request(`/playlists/${id}/items/${movieId}`, { method: "DELETE", deviceId });
  }
};
