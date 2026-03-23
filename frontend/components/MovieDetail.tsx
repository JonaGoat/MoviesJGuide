import React from "react";
import { MovieDetail as MovieDetailType } from "../lib/types";

type MovieDetailProps = {
  movie: MovieDetailType | null;
  loading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToPlaylist: () => void;
  onRemoveFromPlaylist: () => void;
  showRemoveFromPlaylist: boolean;
};

export function MovieDetail({
  movie,
  loading,
  isFavorite,
  onToggleFavorite,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  showRemoveFromPlaylist
}: MovieDetailProps) {
  if (!movie) {
    return <div className="metaLine">Selecciona una pelicula.</div>;
  }

  const runtimeLabel = loading ? "..." : movie.runtime || "-";
  const ratingLabel = loading ? "..." : movie.rating ? movie.rating.toFixed(1) : "-";
  const descLabel = loading ? "Cargando detalles..." : movie.description || "Descripcion no disponible.";

  return (
    <>
      <div
        className="hero"
        id="hero"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(movie.color ? ({ "--hero-color": movie.color, "--hero-bg": `url('${movie.bannerPath}')` } as any) : {})
        }}
      >
        <img className="heroBanner" alt="banner" src={movie.bannerPath} />
        <div className="heroShade" />
      </div>

      <div className="metaLine">
        <span>{movie.genres.join(" - ")}</span>
        <span className="dot">-</span>
        <span>Runtime: <b>{runtimeLabel}</b></span>
        <span className="dot">-</span>
        <span><span className="star">*</span> <b>{ratingLabel}</b></span>
      </div>

      <div className="titleRow">
        <h1 className="detailTitle">{movie.title}</h1>
        <button className={`iconBtn ${isFavorite ? "is-active" : ""}`} type="button" onClick={onToggleFavorite}>
          <span>{isFavorite ? "*" : "o"}</span>
        </button>
      </div>

      <div className="year">{movie.year}{movie.isUpcoming ? " - Proximamente" : ""}</div>
      <p className="desc">{descLabel}</p>

      <div className="actions">
        <a className="btn btn--primary" href={movie.trailerUrl || "#"} target="_blank" rel="noreferrer">
          Ver trailer
        </a>
        <button className="btn btn--secondary" type="button" onClick={onAddToPlaylist}>
          Agregar a playlist
        </button>
        <button
          className={`btn btn--ghost ${showRemoveFromPlaylist ? "" : "is-hidden"}`}
          type="button"
          onClick={onRemoveFromPlaylist}
        >
          Quitar de playlist
        </button>
      </div>
    </>
  );
}
