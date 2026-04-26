interface SelectIpputProps {
  value: string;
  onSelect: (v: string) => void;
  list: string[];
  text: string;
}

export const SelectInput = ({
  value,
  list,
  text,
  onSelect,
}: SelectIpputProps) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      value={value}
      className="form-select"
    >
      <option value="" disabled hidden>
        {text}
      </option>

      {list.map((c, i) => (
        <option key={c + i} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};
