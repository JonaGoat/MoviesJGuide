import React from "react";
import { MovieListItem } from "../lib/types";

const getOrderKey = (orderMode: "chrono" | "release") =>
  orderMode === "release" ? "releaseOrder" : "chronoOrder";

function phaseOrder(phases: string[]) {
  return [...phases].sort((a, b) => {
    const na = Number((a.match(/\d+/) || ["0"])[0]);
    const nb = Number((b.match(/\d+/) || ["0"])[0]);
    return na - nb;
  });
}

type TimelineProps = {
  phases: string[];
  movies: MovieListItem[];
  selectedPhases: string[];
  orderMode: "chrono" | "release";
  onTogglePhase: (phase: string) => void;
  onClearPhases: () => void;
  onSelectMovie: (id: string) => void;
};

export function Timeline(props: TimelineProps) {
  const orderedPhases = phaseOrder(props.phases);
  const active = props.selectedPhases;
  const key = getOrderKey(props.orderMode);

  const groups = active.map((phase) => {
    const items = props.movies
      .filter((m) => m.phase === phase)
      .sort((a, b) => (a[key] ?? 9999) - (b[key] ?? 9999));
    return { phase, items };
  });

  return (
    <section className="timeline" id="timeline">
      <div className="timelineHead">
        <h2>Timeline por Fase</h2>
        <p>Marca una o varias fases para ver su lista debajo.</p>
      </div>

      <div className="timelineGrid" id="timelineGrid">
        {orderedPhases.map((ph) => {
          const count = props.movies.filter((m) => m.phase === ph).length;
          const isActive = active.includes(ph);
          return (
            <div
              key={ph}
              className={`phaseCard ${isActive ? "is-active" : ""}`}
              onClick={() => props.onTogglePhase(ph)}
            >
              <b>{ph}</b>
              <span>{count} pelicula(s)</span>
              {isActive ? <div className="phaseCheck">OK</div> : null}
            </div>
          );
        })}
      </div>

      <div className={`timelineList ${active.length ? "" : "is-hidden"}`} id="timelineList">
        {active.length ? (
          <>
            <div className="timelineListHead">
              <h3 className="timelineListTitle">{active.join(" + ")}</h3>
              <div className="timelineListSub">
                <span>
                  {active.reduce((acc, ph) => acc + props.movies.filter((m) => m.phase === ph).length, 0)} pelicula(s)
                </span>
                <button className="btn btn--chip btn--danger" type="button" onClick={props.onClearPhases}>
                  Limpiar fases
                </button>
              </div>
            </div>

            <div>
              {groups.map((group) => (
                <div key={group.phase} className="phaseGroup">
                  <div className="phaseGroupTitle">
                    {group.phase} <span className="phaseGroupCount">{group.items.length} pelicula(s)</span>
                  </div>
                  <div className="phaseColumn">
                    {group.items.map((m) => (
                      <div key={m.id} className="phaseItem" onClick={() => props.onSelectMovie(m.id)}>
                        <div className="phaseItem__poster">
                          <img src={m.posterPath} alt={m.title} />
                        </div>
                        <div className="phaseItem__dot" style={{ background: m.color }} />
                        <div className="phaseItem__main">
                          <div className="phaseItem__title">{m.title}</div>
                          <div className="phaseItem__meta">
                            {m.year} - {m.phase}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
