import { useState } from "react";
import { Container } from "../shared/container";
import type { CheckboxField, CreateVacancyInput, NumberField, TextField } from "../lib/types";
import { TextInput } from "../shared/text-input";
import { NumberInput } from "../shared/number-input ";
import { CheckBoxInput } from "../shared/checkbox-input";
import { CITIES } from "../lib/data";
import { SelectInput, type SelectInputOption } from "../shared/select-input";
import { SwitchInput } from "../shared/switch-input";
import { useCreateVacancy } from "../api-methods/create-vacancy";
import { Column } from "../shared/column";
import { useGetUsers } from "../api-methods/get-user";

const DEFAULT_TITLE = {

    text: "",
    isTouched: false,
    isValid: false,
  } as TextField
 const DEFAULT_CITY = {
    text: "",
    isTouched: false,
    isValid: false,
  } as TextField
 
const DEFAULT_SALARY = {
    number: null,
    isTouched: false,
    isValid: false,
  } as NumberField

const DEFAULT_ISCITIZEN = {
    status: false,
    isTouched: false,
    isValid: false,
  } as CheckboxField

  

export const CreateApplicationForm = () => {

  const {data: users,isLoading: isUsersLoading,isRefetching: isUsersRefetching,} = useGetUsers();

  const { mutate: createVacancy, isPending: isVacancyCreating } = useCreateVacancy();

  const [title, setTitle] = useState<TextField>(DEFAULT_TITLE);

  const [city, setCity] = useState<TextField>(DEFAULT_CITY );
  const [cityId, setCityId] = useState<number>(0 );
  const [userId, setUserId] = useState<number>(0 );

  const [salary, setSalary] = useState<NumberField>(DEFAULT_SALARY);

  const [isCitizen, setCitizen] = useState<CheckboxField>(DEFAULT_ISCITIZEN);

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

  const handleOnCitySelectCange = (inputCity: number) => {

    setCityId(inputCity);


    setCity({
      text: CITIES.find(c=> c.id == inputCity)?.label ?? 0,
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

 

  const handlOnVacancyCreate = () => {

    var input = {
      id: -1,
      title: title.text,
      city: city.text,
      salary: salary.number,
      isCityzen: isCitizen.status,
      userId : userId,
      description: "test"
    } as CreateVacancyInput;

    createVacancy(input, {onSuccess: (id:number) => { 
      console.log("Created: " + id );
      resetForm();
    } })

  };

  const resetForm = () => {
   
    setCityId(0)
    setUserId(0)
    setTitle(DEFAULT_TITLE)
    setCity(DEFAULT_CITY)
    setSalary(DEFAULT_SALARY)
    setCitizen(DEFAULT_ISCITIZEN)
    setCitySelect(false)
  }

  const isApplicationCreating = isVacancyCreating;
  const isFormValid = userId> 0 && title.isValid && salary.isValid && city.isValid;


  return (
    <Container>
     <Column>
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

          <SelectInput 
          value = {cityId} 
          list ={CITIES} 
          text= "Выберете город" 
          onSelect={handleOnCitySelectCange}
          />

      )}

      <SwitchInput 
      text="Выбрать город из списка"
      isChecked={isCitySelect}
      onChange={handleOnSwitchChange}
      />

      {/* <div className="form-check form-switch">
        <input
          checked={isCitySelect}
          onChange={(e) => handleOnSwitchChange(e.target.checked)}
          className="form-check-input"
          type="checkbox"
          role="switch"
        />
        <span>Выбрать город из списка</span>
      </div> */}

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

      <SelectInput 
          value = {userId} 
          list ={users?.map( u => ({id: u.id, label: u.firstName+" "+ u.lastName+"-"+ u.patronymic} as SelectInputOption)) ?? []} 
          text= "Выберете работодателя" 
          onSelect={(id) => setUserId(id)}
          isLoading ={isUsersLoading||isUsersRefetching}
          />

      <button 
      onClick = {handlOnVacancyCreate}
      disabled ={isApplicationCreating || !isFormValid}
      className = "btn btn-success w-100"
      >
        Добавить 
      </button>
      </Column>

    </Container>
  );
};
