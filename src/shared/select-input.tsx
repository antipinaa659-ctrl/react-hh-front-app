interface SelectIpputProps {
  value: number;
  list: SelectInputOption[];
  text: string;
  onSelect: (v: number) => void;
  isLoading?: boolean;
}

export interface SelectInputOption{
  id: number;
  label: string;
}

export const SelectInput = ({
  value,
  list,
  text,
  onSelect,
  isLoading,
}: SelectIpputProps) => {

  const handleOnSelect = (val: string) => {

    onSelect(Number(val));

  }

  return (
    <select
      onChange={(e) => handleOnSelect(e.target.value)}
      value= {value === 0 ?"": value}
      className="form-select"
    >
      <option value="" disabled hidden>
        {text}
      </option>

      {list.map((opt, i) => (
        <option key={opt.id +"-"+ i} value={opt.id}>
          {opt.label}
        </option>
      ))}

      {isLoading && 
        <option value="" disabled>
          Загрузка...
        </option>
      }
    </select>
  );
};
