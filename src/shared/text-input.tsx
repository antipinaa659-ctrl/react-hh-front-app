import { INPUT_WIDTH } from "../lib/data";
import type { TextField } from "../lib/types";

interface TextInputProps {
  field: TextField;
  isDisabled?: boolean;
  placeHolder?: string;
  width?:number;
  onChange: (t: string) => void;
}

export const TextInput = ({
  field,
  isDisabled,
  placeHolder,
  width,
  onChange,
}: TextInputProps) => {
  return (
    <div style={{width: width?? INPUT_WIDTH}}>
      <input
        value={field.text}
        onChange={(e) => onChange(e.target.value)}
        className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""} `}
        type="text"
        placeholder={placeHolder}
        disabled={isDisabled}
      />
      {field.errorText && (
        <span className="text-danger">{field.errorText}</span>
      )}
    </div>
  );
};
