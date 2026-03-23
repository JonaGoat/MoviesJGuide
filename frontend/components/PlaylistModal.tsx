import React, { useEffect, useState } from "react";
import { Playlist } from "../lib/types";

type PlaylistModalProps = {
  open: boolean;
  playlists: Playlist[];
  onClose: () => void;
  onAdd: (playlistId: string) => void;
  onCreateAndAdd: (name: string) => void;
};

export function PlaylistModal({ open, playlists, onClose, onAdd, onCreateAndAdd }: PlaylistModalProps) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    if (!selectedId && playlists.length) {
      setSelectedId(playlists[0].id);
    }
  }, [open, playlists, selectedId]);

  if (!open) return null;

  const handleAdd = () => {
    const id = selectedId || playlists[0]?.id;
    if (!id) return;
    onAdd(id);
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateAndAdd(newName.trim());
    setNewName("");
  };

  return (
    <div id="playlistModal" className="modal is-open" aria-hidden="false">
      <div className="modal__backdrop" data-close="1" onClick={onClose} />
      <div className="modal__panel" role="dialog" aria-label="Agregar a playlist">
        <div className="modal__head">
          <div className="modal__title">Playlists</div>
          <button className="modal__x" type="button" data-close="1" onClick={onClose}>
            x
          </button>
        </div>

        <div className="modal__sub">Elige una playlist</div>

        <div className="modal__row">
          <select
            className="panelControl"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {playlists.map((pl) => (
              <option key={pl.id} value={pl.id}>
                {pl.name}
              </option>
            ))}
          </select>
          <button className="btn btn--primary" type="button" onClick={handleAdd}>
            Agregar
          </button>
        </div>

        <div className="modal__divider" />

        <div className="modal__row">
          <input
            className="panelControl"
            placeholder="Nombre nueva playlist..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn--secondary" type="button" onClick={handleCreate}>
            Crear + Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
