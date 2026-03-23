import React from "react";
import { SearchBar } from "./SearchBar";
import { OrderSwitch } from "./OrderSwitch";
import { FiltersPanel } from "./FiltersPanel";

type TopbarProps = {
  search: string;
  onSearch: (value: string) => void;
  orderMode: "chrono" | "release";
  onToggleOrder: () => void;
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
  onFiltersOpenChange?: (open: boolean) => void;
};

export function Topbar(props: TopbarProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <img src="/favicon.png" alt="GuideMovies logo" className="brand__logo" />
        <div className="brand__title">GuideMovies</div>
      </div>

      <SearchBar value={props.search} onChange={props.onSearch} />
      <OrderSwitch orderMode={props.orderMode} onToggle={props.onToggleOrder} />
      <FiltersPanel
        listMode={props.listMode}
        onListModeChange={props.onListModeChange}
        genres={props.genres}
        phases={props.phases}
        genre={props.genre}
        phase={props.phase}
        onGenreChange={props.onGenreChange}
        onPhaseChange={props.onPhaseChange}
        onReset={props.onReset}
        onToggleTimeline={props.onToggleTimeline}
        onTogglePlaylists={props.onTogglePlaylists}
        onOpenChange={props.onFiltersOpenChange}
      />
    </header>
  );
}
