import { INPUT_WIDTH } from "../lib/data";
import type { TextField } from "../lib/types";

interface PhoneInputProps {
  field: TextField;
  isDisabled?: boolean;
  placeHolder?: string;
  width?: number;
  onChange: (t: string) => void;
}

export const PhoneInput = ({
  field,
  placeHolder,
  isDisabled,
  width = INPUT_WIDTH,
  onChange,
}: PhoneInputProps) => {
  return (
    <div style={{ width: width + "px" }} className="d-fllex flex-column gap-1">
      <div  className="input-group">
        <span className=" input-group-text">+7</span>
        <input
          value={field.text}
          onChange={(e) => onChange(e.target.value)}
          className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""} `}
          type="text"
          placeholder={placeHolder}
          disabled={isDisabled}
        />
       
      </div>
       <div className="d-flex flex-column">
          {field.errors &&
            field.errors.length > 0 &&
            field.errors.map((e, i) => (
              <span className="text-danger" key={i}>
                {e}
              </span>
            ))}
        </div>
    </div>
  );
};
