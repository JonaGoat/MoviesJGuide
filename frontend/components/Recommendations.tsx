import React, { useRef } from "react";
import { MovieListItem } from "../lib/types";

type RecommendationsProps = {
  movies: MovieListItem[];
  title: string;
  onSelect: (movieId: string) => void;
};

export function Recommendations({ movies, onSelect, title }: RecommendationsProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  const scrollRow = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction === "left" ? -520 : 520, behavior: "smooth" });
  };

  return (
    <div className="reco" id="recoSection">
      <div className="recoHead">
        <h3 className="recoTitle" id="recoTitle">{title}</h3>
        <div className="recoArrows">
          <button type="button" className="arrowBtn" onClick={() => scrollRow("left")}>
            {"<"}
          </button>
          <button type="button" className="arrowBtn" onClick={() => scrollRow("right")}>
            {">"}
          </button>
        </div>
      </div>

      <div ref={rowRef} className="recoRow soft-scroll">
        {movies.map((movie) => (
          <div key={movie.id} className="recoCard" onClick={() => onSelect(movie.id)}>
            <div className="recoImg" style={{ backgroundImage: `url('${movie.bannerPath}')` }} />
            <div className="recoBody">
              <div className="recoName">{movie.title}</div>
              <div className="recoSub">{movie.year} - {movie.heroKey}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
