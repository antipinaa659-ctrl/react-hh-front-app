import { INPUT_WIDTH } from "../lib/data";
import type { NumberField } from "../lib/types";

interface NumberInputProps {
  field: NumberField;
  isDisabled?: boolean;
  placeHolder?: string;
  width?:number;
  onChange: (n: number | null) => void;
}

export const NumberInput = ({
  field,
  isDisabled,
  placeHolder,
  width,
  onChange,
}: NumberInputProps) => {

const handleSanytizeText = (inputText: string) => {

  const numberOnly = inputText.replace(/\D/g,""); 
  if(numberOnly === ""){
    onChange(null);
    return;
  }


  onChange(Number(numberOnly));
}




  return (
    <div style={{width: width?? INPUT_WIDTH}}>
      <input
        value={field.number ?? ""}
        onChange={(e) => handleSanytizeText(e.target.value)}
        className={`form-control ${field.isTouched ? (field.isValid ? "is-valid" : "is-invalid") : ""} `}
        type="text"
        placeholder={placeHolder}
        disabled={isDisabled}
      />
      {/* {field.errorText && (
        <span className="text-danger">{field.errorText}</span>
      )} */}
    </div>
  );
};
