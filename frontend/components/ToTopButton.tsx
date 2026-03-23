import React from "react";

type ToTopButtonProps = {
  visible: boolean;
  onClick: () => void;
};

export function ToTopButton({ visible, onClick }: ToTopButtonProps) {
  return (
    <button
      className={`toTopBtn ${visible ? "is-show" : ""}`}
      type="button"
      title="Subir"
      aria-label="Volver arriba"
      onClick={onClick}
    >
      ^
    </button>
  );
}
