import { useState } from "react";
import { Container } from "../shared/container";
import type { CheckboxField, NumberField, TextField } from "../lib/types";
import { TextInput } from "../shared/text-input";
import { NumberInput } from "../shared/number-input ";
import { CheckBoxInput } from "../shared/checkbox-input";
import { CITIES } from "../lib/data";

export const CreateApplicationForm = () => {
  const [title, setTitle] = useState<TextField>({
    text: "",
    isTouched: false,
    isValid: false,
  } as TextField);

  const [city, setCity] = useState<TextField>({
    text: "",
    isTouched: false,
    isValid: false,
  } as TextField);

  const [salary, setSalary] = useState<NumberField>({
    number: null,
    isTouched: false,
    isValid: false,
  } as NumberField);

  const [isCitizen, setCitizen] = useState<CheckboxField>({
    status: false,
    isTouched: false,
    isValid: false,
  } as CheckboxField);

  const [isCitySelect, setCitySelect] = useState<boolean>(false);

  const handleOnTitleChange = (inputText: string) => {
    const isTitleValid = inputText.length > 5;
    const errosMsgs = [] as string[];

    if (!isTitleValid) {
      errosMsgs.push("Слишком короткое наименование вакансии");
    }

    setTitle({
      text: inputText,
      isTouched: true,
      isValid: isTitleValid,
      errors: errosMsgs,
    } as TextField);
  };

  const hendleOnCityChange = (InputText: string) => {
    const isCityValid = InputText.length >= 2;
    const isFirstLetterValid =
      InputText.length &&
      InputText.charAt(0) !== InputText.charAt(0).toLocaleLowerCase();

    const errosMsgs = [] as string[];

    if (!isCityValid) {
      errosMsgs.push("Слишком короткое наименование");
    }
    if (InputText !== "" && !isFirstLetterValid) {
      errosMsgs.push("Название города должно начинатося с заглавной буквы");
    }

    setCity({
      text: InputText,
      isTouched: true,
      isValid: isCityValid && isFirstLetterValid,
      errors: errosMsgs,
    } as TextField);
  };

  const hendleOnSalaryChange = (inputNumber: number | null) => {
    const hasSalary = inputNumber !== null;
    const isSalaryValid =
      inputNumber !== null && hasSalary && inputNumber < 999_999_9;

    const errorsMsgs = [] as string[];

    if (!hasSalary) {
      errorsMsgs.push("Укажите зарплату");
    }

    if (hasSalary && !isSalaryValid) {
      errorsMsgs.push("Слишком большое 3начение");
    }

    setSalary({
      number: inputNumber,
      isTouched: true,
      isValid: isSalaryValid,
      errors: errorsMsgs,
    } as NumberField);
  };

  const handlOnCitizenChange = (s: boolean) => {
    setCitizen({
      status: s,
      isTouched: false,
      isValid: true,
      errors: [] as string[],
    } as CheckboxField);
  };

  const handleOnCitySelectCange = (inputCity: string) => {
    setCity({
      text: inputCity,
      isTouched: true,
      isValid: true,
      errors: [] as string[],
    } as TextField);
  };

  const handleOnSwitchChange = (v: boolean) => {
   
      //переключается на ввод в ручную то город стереть
      //то город стереть 
      setCity({
        text: "",
        isTouched: false,
        isValid: false,
        errors: [] as [],
      } as TextField);
    
    setCitySelect(v);
  };

  const isApplicationCreating = false;

  return (
    <Container>
      <TextInput
        field={title}
        onChange={handleOnTitleChange}
        placeHolder="Наименование"
        isDisabled={isApplicationCreating}
        width={500}
      />

      {!isCitySelect && (
        <TextInput
          field={city}
          onChange={hendleOnCityChange}
          placeHolder="Город"
          isDisabled={isApplicationCreating}
          width={500}
        />
      )}

      {isCitySelect && (
        <select
          onChange={(e) => handleOnCitySelectCange(e.target.value)}
          value={city.text}
          className="form-select "
        >
          <option value="" disabled hidden>
            Выбрать город
          </option>

          {CITIES.map((c, i) => (
            <option key={c + i} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      <div className="form-check form-switch">
        <input
          checked={isCitySelect}
          onChange={(e) => handleOnSwitchChange(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          role="switch"
        />
        <span>Выбрать город из списка</span>
      </div>

      <NumberInput
        field={salary}
        onChange={hendleOnSalaryChange}
        placeHolder="Зарплата"
        isDisabled={isApplicationCreating}
        width={500}
      />

      <CheckBoxInput
        field={isCitizen}
        onChange={handlOnCitizenChange}
        isDisabled={isApplicationCreating}
        label="Только для граждан РФ"
      />
    </Container>
  );
};
