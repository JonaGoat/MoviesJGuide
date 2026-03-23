import React from "react";
import { MovieListItem } from "../lib/types";
import { heroLabel } from "../lib/hero";

type MovieCardProps = {
  movie: MovieListItem;
  isActive: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
};

export function MovieCard({ movie, isActive, isFavorite, onSelect, onToggleFavorite }: MovieCardProps) {
  const ratingPct = movie.rating ? Math.min(100, Math.max(8, (movie.rating / 10) * 100)) : 18;
  return (
    <div
      className={`card ${isActive ? "is-active" : ""}`}
      data-id={movie.id}
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(movie.color ? ({ "--accent": movie.color, "--banner": `url('${movie.bannerPath}')` } as any) : {})
      }}
      onClick={onSelect}
    >
      <div className="poster">
        <img src={movie.posterPath} alt={`${movie.title} poster`} />
      </div>
      <div className="info">
        <div className="nameRow">
          <div className="name">{movie.title}</div>
          {movie.isUpcoming ? <div className="pillSoon">Proximamente</div> : null}
        </div>
        <div className="sub">
          {movie.year} - {heroLabel(movie.heroKey)} - {movie.phase}
        </div>
        <div className="ratingLabel">Rating</div>
        <div className="progress">
          <span style={{ width: `${ratingPct}%`, background: movie.color }} />
        </div>
      </div>
      <button
        className={`favBtn ${isFavorite ? "is-active" : ""}`}
        type="button"
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
      >
        <span>{isFavorite ? "*" : "o"}</span>
      </button>
    </div>
  );
}
