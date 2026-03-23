type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="searchWrap">
      <input
        className="search"
        placeholder="Buscar por titulo, anio, fase, heroe..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
