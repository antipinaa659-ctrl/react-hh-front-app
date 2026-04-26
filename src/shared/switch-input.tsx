
interface SwitchInputProps {
    text: string;
    isChecked: boolean;
    onChange: (e: boolean) => void;
}

export const SwitchInput =({text, isChecked, onChange} : SwitchInputProps) =>{

    return (<div className="form-check form-switch">
        <input
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          role="switch"
        />
        <span>{text}</span>
      </div>
    )
}