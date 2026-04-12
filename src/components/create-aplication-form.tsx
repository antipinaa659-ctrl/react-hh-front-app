import { useState } from "react";
import { Container } from "../shared/container";
import type { NumberField, TextField } from "../lib/types";
import { TextInput } from "../shared/text-input";
import { NumberInput } from "../shared/number-input ";

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





  const handleOnTitleChange = (inputText: string) => {

    const isTitleValid = inputText.length > 5;

    setTitle({
      text: inputText,
      isTouched: true,
      isValid: isTitleValid,
      errorText: isTitleValid ? null : "Слишком короткое наименование вакансии",
    } as TextField);
  };



  const hendleOnCityChange =(InputText: string) =>{
    const isCityValid = InputText.length >2;

    setCity({
        text: InputText,
        isTouched: true,
        isValid: isCityValid,
        errorText: isCityValid ? null: "Город не может быть менее 2 букв"
    })

  };

  const hendleOnSalaryChange =(inputNumber: number | null) =>{
    

    const hasSalary= inputNumber !== null;
    const isSalaryValid = hasSalary && inputNumber < 999_999_9;

    const errorMsg = hasSalary && ! isSalaryValid ? "Слишком большое 3начение":" Укажите зарплату";
    


    setSalary({
        number: inputNumber,
        isTouched: true,
        isValid: isSalaryValid,
        errorText: isSalaryValid ? null: errorMsg,
    } as NumberField);

  };


  const isApplicationCreating = false;



  return (
    <Container>
      <TextInput
        field={title}
        onChange={handleOnTitleChange}
        placeHolder="Наименование"
        isDisabled={isApplicationCreating}
        width = {500}
      />

      <TextInput
        field={city}
        onChange={hendleOnCityChange}
        placeHolder="Город"
        isDisabled={isApplicationCreating}
        width = {500}
      />

      <NumberInput
        field={salary}
        onChange={hendleOnSalaryChange}
        placeHolder="Зарплата"
        isDisabled={isApplicationCreating}
        width = {500}
      />
    </Container>
  );
};
