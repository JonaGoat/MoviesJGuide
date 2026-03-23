import React from "react";
import { MovieListItem, Playlist } from "../lib/types";
import { MovieCard } from "./MovieCard";

export type SidebarView = "movies" | "playlists";

export type SidebarProps = {
  view: SidebarView;
  title: string;
  subtitle: string;
  movies: MovieListItem[];
  selectedId: string | null;
  favorites: Set<string>;
  playlists: Playlist[];
  playlistCovers: Record<string, string | null>;
  isMobile: boolean;
  inlineDetailId: string | null;
  inlineDetail: React.ReactNode;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onSelectPlaylist: (id: string) => void;
  onRenamePlaylist: (id: string) => void;
  onDeletePlaylist: (id: string) => void;
  onBackToAll: () => void;
  onNewPlaylist: () => void;
};

export function Sidebar({
  view,
  title,
  subtitle,
  movies,
  selectedId,
  favorites,
  playlists,
  playlistCovers,
  isMobile,
  inlineDetailId,
  inlineDetail,
  onSelect,
  onToggleFavorite,
  onSelectPlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onBackToAll,
  onNewPlaylist
}: SidebarProps) {
  return (
    <aside className="sidebar soft-scroll" id="sidebar">
      <div className="sidebarHead">
        <div className="sidebarTitle" id="sidebarTitle">{title}</div>
        <div className="sidebarSub" id="sidebarSub">{subtitle}</div>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            className={`btn btn--chip ${view === "movies" && title === "Todas" ? "is-hidden" : ""}`}
            type="button"
            onClick={onBackToAll}
          >
            {"<-"} Volver
          </button>
          <button
            className={`btn btn--chip ${view === "playlists" ? "" : "is-hidden"}`}
            type="button"
            onClick={onNewPlaylist}
          >
            + Nueva
          </button>
        </div>
      </div>

      <div id="movieList" className="list soft-scroll">
        {view === "playlists" ? (
          playlists.length ? (
            playlists.map((pl) => (
              <div key={pl.id} className="plCard" onClick={() => onSelectPlaylist(pl.id)}>
                <div className="plCover">
                  {playlistCovers[pl.id] ? <img src={playlistCovers[pl.id] || ""} alt={pl.name} /> : null}
                </div>
                <div className="plInfo">
                  <div className="plName">{pl.name}</div>
                  <div className="plMeta">{pl.itemCount} pelicula(s)</div>
                </div>
                <div className="plBtns">
                  <button
                    className="plIcon"
                    title="Renombrar"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRenamePlaylist(pl.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="plIcon plIcon--danger"
                    title="Borrar"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePlaylist(pl.id);
                    }}
                  >
                    Del
                  </button>
                  <button
                    className="plView"
                    title="Ver"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlaylist(pl.id);
                    }}
                  >
                    Ver
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13, padding: "8px 4px" }}>
              No hay playlists. Crea tu primera playlist.
            </div>
          )
        ) : (
          movies.map((m) => (
            <React.Fragment key={m.id}>
              <MovieCard
                movie={m}
                isActive={m.id === selectedId}
                isFavorite={favorites.has(m.id)}
                onSelect={() => onSelect(m.id)}
                onToggleFavorite={() => onToggleFavorite(m.id)}
              />
              {isMobile && inlineDetailId === m.id ? inlineDetail : null}
            </React.Fragment>
          ))
        )}
      </div>
    </aside>
  );
}
