import React, { useEffect, useRef, useState } from "react";

type FiltersPanelProps = {
  listMode: "all" | "favorites" | "playlist";
  onListModeChange: (value: "all" | "favorites" | "playlist") => void;
  genres: string[];
  phases: string[];
  genre: string;
  phase: string;
  onGenreChange: (value: string) => void;
  onPhaseChange: (value: string) => void;
  onReset: () => void;
  onToggleTimeline: () => void;
  onTogglePlaylists: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function FiltersPanel(props: FiltersPanelProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  useEffect(() => {
    props.onOpenChange?.(open);
  }, [open, props]);

  return (
    <div className="menu">
      <button
        ref={buttonRef}
        className="menuBtn menuBtn--pill"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Filtros <span className="caret">v</span>
      </button>

      <div
        ref={panelRef}
        className={`menuPanel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Filtros"
      >
        <div className="panelRow">
          <div className="panelLabel">Lista</div>
          <select
            className="panelControl"
            value={props.listMode}
            onChange={(e) => props.onListModeChange(e.target.value as "all" | "favorites" | "playlist")}
          >
            <option value="all">Todas</option>
            <option value="favorites">Favoritos</option>
            <option value="playlist">Playlist</option>
          </select>
        </div>

        <div className="panelRow">
          <div className="panelLabel">Genero</div>
          <select className="panelControl" value={props.genre} onChange={(e) => props.onGenreChange(e.target.value)}>
            <option value="Todos">Todos</option>
            {props.genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="panelRow">
          <div className="panelLabel">Fase</div>
          <select className="panelControl" value={props.phase} onChange={(e) => props.onPhaseChange(e.target.value)}>
            <option value="Todas">Todas</option>
            {props.phases.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="panelRow panelRow--actions">
          <button className="btn btn--chip" type="button" onClick={props.onToggleTimeline}>
            Timeline
          </button>
          <button className="btn btn--chip btn--danger" type="button" onClick={props.onReset}>
            Reset
          </button>
        </div>

        <div className="panelRow panelRow--actions">
          <button className="btn btn--secondary" type="button" onClick={props.onTogglePlaylists}>
            Playlists
          </button>
        </div>

        <div className="panelHelp">
          Tip: En la Timeline puedes marcar varias fases.
        </div>
      </div>
    </div>
  );
}
