export function Toast({ message }: { message: string }) {
  return <div className={`toast ${message ? "is-show" : ""}`}>{message || "Ok"}</div>;
}
