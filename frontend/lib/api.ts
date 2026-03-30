const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type RequestOptions = {
  method?: string;
  body?: unknown;
  deviceId?: string | null;
  retry?: number;
};

type ApiError = {
  message: string;
  status?: number;
  body?: string;
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(path: string, options: RequestOptions = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  if (options.deviceId) {
    headers["x-device-id"] = options.deviceId;
  }

  const retry = options.retry ?? 1;
  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt <= retry; attempt += 1) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store"
      });

      if (!res.ok) {
        const text = await res.text();
        lastError = { message: "Request failed", status: res.status, body: text };
        throw lastError;
      }

      return res.json();
    } catch (err) {
      lastError = {
        message: err instanceof Error ? err.message : "Network error",
        status: (err as ApiError)?.status,
        body: (err as ApiError)?.body
      };
      if (attempt < retry) {
        await sleep(400 * (attempt + 1));
        continue;
      }
    }
  }

  throw new Error(lastError?.body || lastError?.message || "Request failed");
}

export const api = {
  getMovies(params: Record<string, string | number | undefined>) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") qs.set(k, String(v));
    });
    return request(`/movies?${qs.toString()}`, { retry: 1 });
  },
  getMovie(id: string) {
    return request(`/movies/${id}`, { retry: 1 });
  },
  getRecommendations(id: string) {
    return request(`/movies/${id}/recommendations`, { retry: 1 });
  },
  getGenres() {
    return request(`/genres`, { retry: 1 });
  },
  getPhases() {
    return request(`/phases`, { retry: 1 });
  },
  getFavorites(deviceId: string) {
    return request(`/favorites`, { deviceId, retry: 1 });
  },
  addFavorite(deviceId: string, movieId: string) {
    return request(`/favorites/${movieId}`, { method: "POST", deviceId, retry: 1 });
  },
  removeFavorite(deviceId: string, movieId: string) {
    return request(`/favorites/${movieId}`, { method: "DELETE", deviceId, retry: 1 });
  },
  getPlaylists(deviceId: string) {
    return request(`/playlists`, { deviceId, retry: 1 });
  },
  createPlaylist(deviceId: string, name: string) {
    return request(`/playlists`, { method: "POST", deviceId, body: { name }, retry: 1 });
  },
  updatePlaylist(deviceId: string, id: string, name: string) {
    return request(`/playlists/${id}`, { method: "PATCH", deviceId, body: { name }, retry: 1 });
  },
  deletePlaylist(deviceId: string, id: string) {
    return request(`/playlists/${id}`, { method: "DELETE", deviceId, retry: 1 });
  },
  getPlaylistItems(deviceId: string, id: string) {
    return request(`/playlists/${id}/items`, { deviceId, retry: 1 });
  },
  addPlaylistItem(deviceId: string, id: string, movieId: string) {
    return request(`/playlists/${id}/items`, { method: "POST", deviceId, body: { movieId }, retry: 1 });
  },
  removePlaylistItem(deviceId: string, id: string, movieId: string) {
    return request(`/playlists/${id}/items/${movieId}`, { method: "DELETE", deviceId, retry: 1 });
  }
};
