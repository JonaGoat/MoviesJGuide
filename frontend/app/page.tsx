"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Topbar } from "../components/Topbar";
import { Sidebar, SidebarView } from "../components/Sidebar";
import { MovieDetail } from "../components/MovieDetail";
import { Recommendations } from "../components/Recommendations";
import { Timeline } from "../components/Timeline";
import { ToTopButton } from "../components/ToTopButton";
import { PlaylistModal } from "../components/PlaylistModal";
import { Toast } from "../components/Toast";
import { api } from "../lib/api";
import { getOrCreateDeviceId } from "../lib/device";
import type { MovieDetail as MovieDetailType, MovieListItem, Playlist, PlaylistItem } from "../lib/types";
import { heroLabel } from "../lib/hero";

const LS_KEY = "guidemovies_app_v2";

type AppState = {
  selectedId: string | null;
  search: string;
  genre: string;
  phase: string;
  selectedPhases: string[];
  listMode: "all" | "favorites" | "playlist";
  orderMode: "chrono" | "release";
  sidebarView: SidebarView;
  activePlaylistId: string | null;
};

const defaultState: AppState = {
  selectedId: null,
  search: "",
  genre: "Todos",
  phase: "Todas",
  selectedPhases: [],
  listMode: "all",
  orderMode: "chrono",
  sidebarView: "movies",
  activePlaylistId: null
};

function loadState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export default function HomePage() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailType | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const [phases, setPhases] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
  const [playlistCovers, setPlaylistCovers] = useState<Record<string, string | null>>({});
  const [reco, setReco] = useState<MovieListItem[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [showToTop, setShowToTop] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [pendingMovieId, setPendingMovieId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [appState, setAppState] = useState<AppState>(defaultState);
  const stateRef = useRef<AppState>(defaultState);

  useEffect(() => {
    const next = loadState();
    setAppState(next);
    stateRef.current = next;
  }, []);

  useEffect(() => {
    stateRef.current = appState;
    saveState(appState);
  }, [appState]);

  useEffect(() => {
    setDeviceId(getOrCreateDeviceId());
  }, []);

  useEffect(() => {
    api.getGenres().then(setGenres).catch(() => setGenres([]));
    api.getPhases().then((data) => setPhases(data.map((p: { name: string }) => p.name))).catch(() => setPhases([]));
  }, []);

  useEffect(() => {
    api
      .getMovies({ search: appState.search, order: appState.orderMode })
      .then((data: MovieListItem[]) => {
        setMovies(data);
        if (!appState.selectedId && data.length) {
          setAppState((prev) => ({ ...prev, selectedId: data[0].id }));
        }
      })
      .catch(() => setMovies([]));
  }, [appState.search, appState.orderMode]);

  useEffect(() => {
    if (!appState.selectedId) {
      setSelectedMovie(null);
      return;
    }
    const summary = movies.find((m) => m.id === appState.selectedId) || null;
    if (summary) {
      setSelectedMovie(summary);
    }
    setDetailLoading(true);
    api
      .getMovie(appState.selectedId)
      .then((data: MovieDetailType) => setSelectedMovie(data))
      .catch(() => {
        // keep summary if available
      })
      .finally(() => setDetailLoading(false));
  }, [appState.selectedId]);

  useEffect(() => {
    if (!deviceId) return;
    api
      .getFavorites(deviceId)
      .then((data) => setFavorites(new Set(data.map((f: { movieId: string }) => f.movieId))))
      .catch(() => setFavorites(new Set()));

    api
      .getPlaylists(deviceId)
      .then((data: Playlist[]) => {
        setPlaylists(data);
        if (!stateRef.current.activePlaylistId && data.length) {
          setAppState((prev) => ({ ...prev, activePlaylistId: data[0].id }));
        }
      })
      .catch(() => setPlaylists([]));
  }, [deviceId]);

  useEffect(() => {
    if (!deviceId || !playlists.length) {
      setPlaylistCovers({});
      return;
    }
    let cancelled = false;
    const loadCovers = async () => {
      const entries = await Promise.all(
        playlists.map(async (pl) => {
          try {
            const items = await api.getPlaylistItems(deviceId, pl.id);
            const first = (items as PlaylistItem[]).slice().sort((a, b) => a.order - b.order)[0];
            if (!first) return [pl.id, null] as const;
            const movie = movies.find((m) => m.id === first.movieId);
            return [pl.id, movie ? movie.posterPath : null] as const;
          } catch {
            return [pl.id, null] as const;
          }
        })
      );
      if (cancelled) return;
      const map: Record<string, string | null> = {};
      entries.forEach(([id, cover]) => {
        map[id] = cover;
      });
      setPlaylistCovers(map);
    };
    loadCovers();
    return () => {
      cancelled = true;
    };
  }, [deviceId, playlists, movies]);

  useEffect(() => {
    if (!deviceId) return;
    const playlistId = appState.activePlaylistId;
    if (!playlistId) {
      setPlaylistItems([]);
      return;
    }
    api
      .getPlaylistItems(deviceId, playlistId)
      .then((items: PlaylistItem[]) => setPlaylistItems(items))
      .catch(() => setPlaylistItems([]));
  }, [deviceId, appState.activePlaylistId]);

  useEffect(() => {
    if (!appState.selectedId) return;
    api
      .getRecommendations(appState.selectedId)
      .then((data: MovieListItem[]) => setReco(data))
      .catch(() => setReco([]));
  }, [appState.selectedId]);

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const topbar = document.querySelector(".topbar");
    if (!topbar) return;
    let raf = 0;

    const applyCompact = () => {
      raf = 0;
      if (!isMobile) {
        topbar.classList.remove("is-compact");
        return;
      }
      if (filtersOpen) {
        topbar.classList.remove("is-compact");
        return;
      }
      const y = window.scrollY || 0;
      if (y > 70) {
        topbar.classList.add("is-compact");
      } else {
        topbar.classList.remove("is-compact");
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(applyCompact);
    };

    applyCompact();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("touchmove", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [isMobile, filtersOpen]);

  useEffect(() => {
    const movie = selectedMovie || movies.find((m) => m.id === appState.selectedId);
    if (!movie) return;
    const bg = document.getElementById("bg");
    if (!bg) return;
    bg.style.background = `radial-gradient(900px 600px at 20% 15%, ${movie.color}29, transparent 60%),
      radial-gradient(900px 700px at 85% 20%, rgba(80,130,255,.12), transparent 55%),
      linear-gradient(180deg, rgba(5,6,10,.2), rgba(5,6,10,.6))`;
  }, [movies, selectedMovie, appState.selectedId]);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(""), 1600);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const getActivePhases = () => {
    if (appState.selectedPhases.length) return appState.selectedPhases;
    if (appState.phase !== "Todas") return [appState.phase];
    return [];
  };

  const filteredMovies = useMemo(() => {
    const activePhases = getActivePhases();
    let list = movies;

    if (appState.search) {
      const s = appState.search.toLowerCase();
      list = list.filter((m) =>
        `${m.title} ${m.year} ${m.phase} ${m.genres.join(" ")} ${heroLabel(m.heroKey)}`.toLowerCase().includes(s)
      );
    }

    if (appState.genre !== "Todos") {
      list = list.filter((m) => m.genres.includes(appState.genre));
    }

    if (activePhases.length) {
      list = list.filter((m) => activePhases.includes(m.phase));
    }

    if (appState.listMode === "favorites") {
      list = list.filter((m) => favorites.has(m.id));
    }

    if (appState.listMode === "playlist") {
      const map = new Map(list.map((m) => [m.id, m]));
      const orderedIds = playlistItems.slice().sort((a, b) => a.order - b.order).map((i) => i.movieId);
      list = orderedIds.map((id) => map.get(id)).filter(Boolean) as MovieListItem[];
    }

    return list;
  }, [movies, appState, favorites, playlistItems]);

  useEffect(() => {
    if (!filteredMovies.length) return;
    if (appState.selectedId && filteredMovies.some((m) => m.id === appState.selectedId)) return;
    setAppState((prev) => ({ ...prev, selectedId: filteredMovies[0].id }));
  }, [filteredMovies, appState.selectedId]);

  const handleToggleFavorite = async (movieId: string) => {
    if (!deviceId) return;
    const isFav = favorites.has(movieId);
    try {
      if (isFav) {
        await api.removeFavorite(deviceId, movieId);
        setToastMsg("Quitado de favoritos");
      } else {
        await api.addFavorite(deviceId, movieId);
        setToastMsg("Agregado a favoritos");
      }
      const next = new Set(favorites);
      if (isFav) next.delete(movieId); else next.add(movieId);
      setFavorites(next);
    } catch {
      setToastMsg("No se pudo actualizar favoritos");
    }
  };

  const handleOpenPlaylistModal = (movieId: string) => {
    setPendingMovieId(movieId);
    setPlaylistModalOpen(true);
  };

  const handleAddToPlaylist = async (playlistId: string) => {
    if (!deviceId || !pendingMovieId) return;
    await api.addPlaylistItem(deviceId, playlistId, pendingMovieId);
    setToastMsg("Agregado a playlist");
    setPlaylistModalOpen(false);
    setPendingMovieId(null);
    setAppState((prev) => ({ ...prev, activePlaylistId: playlistId }));
    const items = await api.getPlaylistItems(deviceId, playlistId);
    setPlaylistItems(items as PlaylistItem[]);
    const refreshed = await api.getPlaylists(deviceId);
    setPlaylists(refreshed as Playlist[]);
  };

  const handleCreatePlaylistAndAdd = async (name: string) => {
    if (!deviceId || !pendingMovieId) return;
    const pl = await api.createPlaylist(deviceId, name);
    setPlaylists((prev) => [pl, ...prev]);
    await api.addPlaylistItem(deviceId, pl.id, pendingMovieId);
    setToastMsg(`Agregado a "${pl.name}"`);
    setPlaylistModalOpen(false);
    setPendingMovieId(null);
    setAppState((prev) => ({ ...prev, activePlaylistId: pl.id }));
    const items = await api.getPlaylistItems(deviceId, pl.id);
    setPlaylistItems(items as PlaylistItem[]);
    const refreshed = await api.getPlaylists(deviceId);
    setPlaylists(refreshed as Playlist[]);
  };

  const handleRemoveFromPlaylist = async (movieId: string) => {
    if (!deviceId || !appState.activePlaylistId) return;
    await api.removePlaylistItem(deviceId, appState.activePlaylistId, movieId);
    setToastMsg("Quitado de la playlist");
    const items = await api.getPlaylistItems(deviceId, appState.activePlaylistId);
    setPlaylistItems(items as PlaylistItem[]);
    const refreshed = await api.getPlaylists(deviceId);
    setPlaylists(refreshed as Playlist[]);
  };

  const handleSelectPlaylist = async (id: string) => {
    setAppState((prev) => ({ ...prev, listMode: "playlist", sidebarView: "movies", activePlaylistId: id }));
    if (!deviceId) return;
    const items = await api.getPlaylistItems(deviceId, id);
    setPlaylistItems(items as PlaylistItem[]);
    setToastMsg("Viendo playlist");
  };

  const handleRenamePlaylist = async (id: string) => {
    if (!deviceId) return;
    const current = playlists.find((p) => p.id === id);
    const name = window.prompt("Nuevo nombre:", current?.name || "");
    if (!name) return;
    await api.updatePlaylist(deviceId, id, name);
    setPlaylists((prev) => prev.map((p) => (p.id === id ? { ...p, name } : p)));
    setToastMsg("Playlist renombrada");
  };

  const handleDeletePlaylist = async (id: string) => {
    if (!deviceId) return;
    const current = playlists.find((p) => p.id === id);
    if (!current) return;
    const ok = window.confirm(`Borrar playlist "${current.name}"?`);
    if (!ok) return;
    await api.deletePlaylist(deviceId, id);
    const next = playlists.filter((p) => p.id !== id);
    setPlaylists(next);
    setToastMsg("Playlist borrada");
    if (appState.activePlaylistId === id) {
      setAppState((prev) => ({ ...prev, activePlaylistId: null, listMode: "all" }));
    }
    if (!next.length && appState.listMode === "playlist") {
      setAppState((prev) => ({ ...prev, listMode: "all" }));
    }
  };

  const handleNewPlaylist = async () => {
    if (!deviceId) return;
    const name = window.prompt("Nombre de la nueva playlist:");
    if (!name) return;
    const pl = await api.createPlaylist(deviceId, name);
    setPlaylists((prev) => [pl, ...prev]);
    setToastMsg("Playlist creada");
  };

  const handleReset = () => {
    setAppState((prev) => ({
      ...prev,
      search: "",
      genre: "Todos",
      phase: "Todas",
      selectedPhases: [],
      listMode: "all",
      sidebarView: "movies"
    }));
    setToastMsg("Reset aplicado");
  };

  const handleTogglePhase = (phase: string) => {
    setAppState((prev) => {
      const next = prev.selectedPhases.includes(phase)
        ? prev.selectedPhases.filter((p) => p !== phase)
        : [...prev.selectedPhases, phase];
      return {
        ...prev,
        selectedPhases: next,
        phase: next.length === 1 ? next[0] : "Todas"
      };
    });
  };

  const handleClearPhases = () => {
    setAppState((prev) => ({ ...prev, selectedPhases: [], phase: "Todas" }));
    setToastMsg("Fases limpiadas");
  };

  const sidebarTitle = appState.sidebarView === "playlists"
    ? "Tus playlists"
    : appState.listMode === "favorites"
      ? "Favoritos"
      : appState.listMode === "playlist"
        ? `Playlist: ${playlists.find((p) => p.id === appState.activePlaylistId)?.name || ""}`
        : "Todas";

  const sidebarSubtitle = appState.sidebarView === "playlists"
    ? "Elige una playlist para ver sus peliculas."
    : appState.listMode === "favorites"
      ? (favorites.size ? "Tus favoritos." : "No hay favoritos aun.")
      : appState.listMode === "playlist"
        ? "Orden segun vas agregando."
        : "Click en una pelicula para verla.";

  const recoTitle = selectedMovie ? `Sigue con ${heroLabel(selectedMovie.heroKey)}...` : "Sigue...";
  const inActivePlaylist = appState.listMode === "playlist" && selectedMovie
    ? playlistItems.some((i) => i.movieId === selectedMovie.id)
    : false;

  const inlineDetail = (
    <section className="detail detail--inline">
      <MovieDetail
        movie={selectedMovie}
        loading={detailLoading}
        isFavorite={!!selectedMovie && favorites.has(selectedMovie.id)}
        onToggleFavorite={() => selectedMovie && handleToggleFavorite(selectedMovie.id)}
        onAddToPlaylist={() => selectedMovie && handleOpenPlaylistModal(selectedMovie.id)}
        onRemoveFromPlaylist={() => selectedMovie && handleRemoveFromPlaylist(selectedMovie.id)}
        showRemoveFromPlaylist={!!selectedMovie && inActivePlaylist}
      />

      <Recommendations
        movies={reco}
        onSelect={(id) => setAppState((prev) => ({ ...prev, selectedId: id }))}
        title={recoTitle}
      />

      <div className="spacer" />
      <Timeline
        phases={phases}
        movies={movies}
        selectedPhases={appState.selectedPhases}
        orderMode={appState.orderMode}
        onTogglePhase={handleTogglePhase}
        onClearPhases={handleClearPhases}
        onSelectMovie={(id) => setAppState((prev) => ({ ...prev, selectedId: id }))}
      />
      <div className="spacer" />
    </section>
  );

  return (
    <>
      <Topbar
        search={appState.search}
        onSearch={(value) => setAppState((prev) => ({ ...prev, search: value }))}
        orderMode={appState.orderMode}
        onToggleOrder={() => setAppState((prev) => ({ ...prev, orderMode: prev.orderMode === "chrono" ? "release" : "chrono" }))}
        listMode={appState.listMode}
        onListModeChange={(value) => {
          if (value === "playlist" && !playlists.length) {
            setToastMsg("Crea una playlist primero");
            setAppState((prev) => ({ ...prev, listMode: "all", sidebarView: "playlists" }));
            return;
          }
          setAppState((prev) => ({ ...prev, listMode: value, sidebarView: "movies" }));
        }}
        genres={genres}
        phases={phases}
        genre={appState.genre}
        phase={appState.phase}
        onGenreChange={(value) => setAppState((prev) => ({ ...prev, genre: value }))}
        onPhaseChange={(value) => setAppState((prev) => ({ ...prev, phase: value, selectedPhases: value === "Todas" ? [] : [value] }))}
        onReset={handleReset}
        onToggleTimeline={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
        onTogglePlaylists={() => setAppState((prev) => ({ ...prev, sidebarView: prev.sidebarView === "playlists" ? "movies" : "playlists" }))}
        onFiltersOpenChange={setFiltersOpen}
      />

      <main className="layout">
        <Sidebar
          view={appState.sidebarView}
          title={sidebarTitle}
          subtitle={sidebarSubtitle}
          movies={filteredMovies}
          selectedId={appState.selectedId}
          favorites={favorites}
          playlists={playlists}
          playlistCovers={playlistCovers}
          isMobile={isMobile && appState.sidebarView === "movies"}
          inlineDetailId={appState.selectedId}
          inlineDetail={inlineDetail}
          onSelect={(id) => setAppState((prev) => ({ ...prev, selectedId: id }))}
          onToggleFavorite={handleToggleFavorite}
          onSelectPlaylist={handleSelectPlaylist}
          onRenamePlaylist={handleRenamePlaylist}
          onDeletePlaylist={handleDeletePlaylist}
          onBackToAll={() => setAppState((prev) => ({ ...prev, listMode: "all", sidebarView: "movies" }))}
          onNewPlaylist={handleNewPlaylist}
        />

        {!isMobile || appState.sidebarView === "playlists" ? (
          <section className="detail soft-scroll" id="detail">
            <MovieDetail
              movie={selectedMovie}
              loading={detailLoading}
              isFavorite={!!selectedMovie && favorites.has(selectedMovie.id)}
              onToggleFavorite={() => selectedMovie && handleToggleFavorite(selectedMovie.id)}
              onAddToPlaylist={() => selectedMovie && handleOpenPlaylistModal(selectedMovie.id)}
              onRemoveFromPlaylist={() => selectedMovie && handleRemoveFromPlaylist(selectedMovie.id)}
              showRemoveFromPlaylist={!!selectedMovie && inActivePlaylist}
            />

            <Recommendations
              movies={reco}
              onSelect={(id) => setAppState((prev) => ({ ...prev, selectedId: id }))}
              title={recoTitle}
            />

            <div className="spacer" />
            <Timeline
              phases={phases}
              movies={movies}
              selectedPhases={appState.selectedPhases}
              orderMode={appState.orderMode}
              onTogglePhase={handleTogglePhase}
              onClearPhases={handleClearPhases}
              onSelectMovie={(id) => setAppState((prev) => ({ ...prev, selectedId: id }))}
            />
            <div className="spacer" />
          </section>
        ) : null}
      </main>

      <PlaylistModal
        open={playlistModalOpen}
        playlists={playlists}
        onClose={() => setPlaylistModalOpen(false)}
        onAdd={handleAddToPlaylist}
        onCreateAndAdd={handleCreatePlaylistAndAdd}
      />

      <Toast message={toastMsg} />
      <ToTopButton visible={showToTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </>
  );
}
