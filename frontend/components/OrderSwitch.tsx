type OrderSwitchProps = {
  orderMode: "chrono" | "release";
  onToggle: () => void;
};

export function OrderSwitch({ orderMode, onToggle }: OrderSwitchProps) {
  const isRight = orderMode === "release";
  return (
    <div className="orderSwitch">
      <div className="orderSwitch__label">Orden</div>
      <button
        className={`switch ${isRight ? "is-right" : ""}`}
        type="button"
        aria-label="Cambiar orden"
        onClick={onToggle}
      >
        <div className="switch__track">
          <div className="switch__knob" />
        </div>
        <div className="switch__text">
          <span className={`switch__opt ${!isRight ? "is-active" : ""}`}>Cronologico</span>
          <span className={`switch__opt ${isRight ? "is-active" : ""}`}>Lanzamiento</span>
        </div>
      </button>
    </div>
  );
}
