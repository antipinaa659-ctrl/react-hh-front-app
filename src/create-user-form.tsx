import { useState, useEffect } from "react";
import type { CreateUserInput, UserModel } from "./types";
import { useCreateUser } from "./api-methods/create-user";
import { useGetUsers } from "./api-methods/get-user";

 interface  TextValidation{
    isLenghtValid: boolean;
    isSpecialSymbolValid: boolean;
    isTextEmptyValid: boolean;
    isFirstUpperCaseValid: boolean;
    isValid: boolean;
    isTouched: boolean;
  }

  

  const isLastNameValidationDefult ={
    isLenghtValid: false,
    isSpecialSymbolValid: false,
    isTextEmptyValid: false,
    isFirstUpperCaseValid: false,
    isValid: false,
    isTouched: false,
  } as TextValidation;


  const isFirstNameValidationDefult ={
    isLenghtValid: false,
    isSpecialSymbolValid: false,
    isTextEmptyValid: false,
    isFirstUpperCaseValid: false,
    isValid: false,
    isTouched: false,
  } as TextValidation;


  const isPatronymicValidationDefult ={
    isLenghtValid: false,
    isSpecialSymbolValid: false,
    isFirstUpperCaseValid: false,
    isValid: false,
    isTouched: false,
  } as TextValidation;

  interface CreateFormProps{
    editedUser : UserModel |null;
    onClick: () => void;
  }

export const CreateUserForm = ({editedUser, onClick} : CreateFormProps) => {
  const { refetch: refetchUsers } = useGetUsers();

  const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

  const hadnleCreate = () => {
    const input = {
      id: editedUser?.id ?? -1,
      firstName: firstName,
      lastName: lastName,
      patronymic: patronymic,
      phoneNumber: "+7"+ phoneNumber,
      age: age,
      isCitizen: isCitizen,
    } as CreateUserInput;

    createUser(input, { onSuccess: onCreateSuccess });
  };

  const onCreateSuccess = () => {
    refetchUsers();
    setFirstName("");
    setLastName("");
    setPatronymic("");
    setPhoneNumber("");
    setAge(18);
    setIsCitizen(false);

    setIsFirstNameValid (isFirstNameValidationDefult);
    setIsLastNameValid (isLastNameValidationDefult);
    setIsPatronymicValid (isPatronymicValidationDefult);
    setIsPhoneNumberValid (false);
    setIsAgeTouched(false);
    setIsAgeValid(true);
    setIsPhoneNumberTouched(false);

    onClick();

  };



 
  const [firstName, setFirstName] = useState<string>(editedUser?.firstName ?? "");
  const [isFirstNameValid, setIsFirstNameValid] = useState<TextValidation>(isFirstNameValidationDefult);


  const [lastName, setLastName] = useState<string>(editedUser?.lastName ?? "");
  const [isLastNameValid, setIsLastNameValid] = useState<TextValidation>(isLastNameValidationDefult);


  const [patronymic, setPatronymic] = useState<string>(editedUser?.patronymic ?? "");
  const [isPatronymicValid, setIsPatronymicValid] = useState<TextValidation>(isPatronymicValidationDefult);

  const [phoneNumber, setPhoneNumber] = useState<string>(editedUser?.phoneNumber ?? "");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [isPhoneNumberTouched, setIsPhoneNumberTouched] = useState<boolean>(false);


  const [age, setAge] = useState<number>(editedUser?.age ?? 18);
  const [isAgeValid, setIsAgeValid] = useState<boolean>(true);
  const [isAgeTouched, setIsAgeTouched] = useState<boolean>(false);

  const [isCitizen, setIsCitizen] = useState<boolean>(editedUser?.isCitizen ?? false);


  useEffect(() =>{

    if (!editedUser){
       setFirstName("");
    setLastName("");
    setPatronymic("");
    setPhoneNumber("");
    setAge(18);
    setIsCitizen(false);

    setIsFirstNameValid (isFirstNameValidationDefult);
    setIsLastNameValid (isLastNameValidationDefult);
    setIsPatronymicValid (isPatronymicValidationDefult);
    setIsPhoneNumberValid (false);
    setIsAgeTouched(false);
    setIsAgeValid(true);
    setIsPhoneNumberTouched(false);
      return;
    }

    setFirstName(editedUser?.firstName ?? "")
    setLastName(editedUser?.lastName ?? "")
    setAge(editedUser?.age ?? 18)
    setPatronymic(editedUser?.patronymic ?? "")
    setPhoneNumber(editedUser?.phoneNumber.substring(2) ?? "")
    setIsCitizen(editedUser?.isCitizen ?? false)

    const isValid ={
    isLenghtValid: true,
    isSpecialSymbolValid: true,
    isTextEmptyValid: true,
    isFirstUpperCaseValid: true,
    isValid: true,
    isTouched: true,
  } as TextValidation;
  
    setIsFirstNameValid (isValid);
    setIsLastNameValid (isValid);
    setIsPatronymicValid (isValid);
    setIsPhoneNumberValid (true);
    setIsAgeTouched(true);
    setIsAgeValid(true);
    setIsPhoneNumberTouched(true);

  },[editedUser])

  

  const handleOnNameChange = (text: string)=>{
  

    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p3 = text !== ""; //текст не пустой
    const p4 = text!== undefined && text.length> 0 && text[0] === text[0].toUpperCase(); //текст с заглавной буквы

    const isNameValid ={
      isLenghtValid: p1,
      isSpecialSymbolValid: p2,
      isTextEmptyValid: p3,
      isFirstUpperCaseValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true
    } as TextValidation;

    setIsFirstNameValid(isNameValid);

    setFirstName(text);
  }


   const handleOnLastNameChange = (text: string)=>{
    

    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p3 = text !== ""; //текст не пустой
    const p4 = text!== undefined && text.length> 0 && text[0] === text[0].toUpperCase(); //текст с заглавной буквы
    const isLastNameValid ={
      isLenghtValid: p1,
      isSpecialSymbolValid: p2,
      isTextEmptyValid: p3,
      isFirstUpperCaseValid: p4,

      isValid: p1 && p2 && p3 && p4,
      isTouched: true
    } as TextValidation;
    
    setIsLastNameValid(isLastNameValid);

    setLastName(text);
    
  }

  const handleOnPatronymicChange = (text: string)=>{
    
    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p4 = text!== undefined && text.length> 0 && text[0] === text[0].toUpperCase(); //текст с заглавной буквы

    const isPatronymicValid ={
      isLenghtValid: p1,
      isSpecialSymbolValid: p2,
      isFirstUpperCaseValid: p4,

      isValid: p1 && p2  && p4,
      isTouched: true
    } as TextValidation;
   
    setIsPatronymicValid(isPatronymicValid);
 
    setPatronymic(text);
    
  }

  const handleOnPhoneNumberChange = (phoneNumber: string)=>{

    setIsPhoneNumberTouched(true);

    const cleanPhoneNumber = phoneNumber.replace(/\D/g,"");

    setIsPhoneNumberValid(/^\d{10}$/.test(cleanPhoneNumber));
    
    setPhoneNumber(cleanPhoneNumber);
    
  }


  const handleAgeChange = (age: number)=>{

    setIsAgeValid(age >=18 && age <=99);
    setIsAgeTouched(true);
    setAge(age);
    
  }

  const hasFirstName = firstName !== undefined && firstName.length > 0;
  const hasLastName = lastName !== undefined && lastName.length > 0;
  const hasPatronymic = patronymic !== undefined && patronymic.length > 0;
//


  return (
    <div
      style={{ width: "400px" }}
      className="d-flex flex-column gap-2 p-2 w-25 bg-light shadow p-3 rounded-3"
    >

      <input 
        value={lastName}
        onChange={(e) => handleOnLastNameChange(e.target.value)}
        className={`form-control ${isLastNameValid.isTouched ? (isLastNameValid.isValid ? "is-valid" : "is-invalid") : ""} `}
        type="text"
        placeholder="Фамилия"
        disabled={isUserCreating}
      />

      {isLastNameValid.isTouched && !isLastNameValid.isTextEmptyValid && <span className="text-danger">Поле не может быть пустым</span>}
      {hasLastName && isLastNameValid.isTouched && !isLastNameValid.isSpecialSymbolValid && <span className="text-danger">Фамилия не может содердать символы и цифры</span>}
      {hasLastName && isLastNameValid.isTouched && !isLastNameValid.isLenghtValid && <span className="text-danger">Фамилия не менее 2 символов</span>}
      {hasLastName && isLastNameValid.isTouched && !isLastNameValid.isFirstUpperCaseValid && <span className="text-danger">Фамилия должна начинаться с большой буквы</span>}

      <input
        value={firstName}
        onChange={(e) => handleOnNameChange(e.target.value)}
        className={`form-control ${isFirstNameValid.isTouched ? (isFirstNameValid.isValid ? "is-valid" : "is-invalid") : ""} `}
        type="text"
        placeholder="Имя"
        disabled={isUserCreating}
      />
      
      {isFirstNameValid.isTouched && !isFirstNameValid.isTextEmptyValid && <span className="text-danger">Поле не может быть пустым</span>}
      {hasFirstName && isFirstNameValid.isTouched && !isFirstNameValid.isSpecialSymbolValid && <span className="text-danger">Имя не может содердать символы и цифры</span>}
      {hasFirstName && isFirstNameValid.isTouched && !isFirstNameValid.isLenghtValid && <span className="text-danger">Имя не менее 2 символов</span>}
      {hasFirstName && isFirstNameValid.isTouched && !isFirstNameValid.isFirstUpperCaseValid && <span className="text-danger">Имя должно начинаться с большой буквы</span>}

      <input
        value={patronymic}
        onChange={(e) => handleOnPatronymicChange(e.target.value)}
        className={`form-control ${isPatronymicValid.isTouched && patronymic.length > 0 ? 
        (isPatronymicValid.isValid ? "is-valid" : "is-invalid"): ""  }`}
        type="text"
        placeholder="Отчество при его наличии"
        disabled={isUserCreating}
      />

      
      {hasPatronymic && isPatronymicValid.isTouched && !isPatronymicValid.isSpecialSymbolValid && <span className="text-danger">Отчество не может содердать символы и цифры</span>}
      {hasPatronymic && isPatronymicValid.isTouched && !isPatronymicValid.isLenghtValid && <span className="text-danger">Поле не менее 2 символов</span>}
      {hasPatronymic && isPatronymicValid.isTouched && !isPatronymicValid.isFirstUpperCaseValid && <span className="text-danger">Отчество должно начинаться с большой буквы</span>}

      

      <div className ="input-group"> 
        <span className =" input-group-text">
          +7
        </span>
        <input 
        value={phoneNumber}
        onChange={(e) => handleOnPhoneNumberChange(e.target.value)}
        className={`form-control ${isPhoneNumberTouched ? (isPhoneNumberValid ? "is-valid" : "is-invalid") : ""} `}
        type="text"
        placeholder="1234567890"
        disabled={isUserCreating}
      />
      </div>
      

      <div className="d-flex flex-row align-items-center gap-3 justify-content-between">

        <input
          className={`form-control w-50" ${isAgeTouched ? (isAgeValid ? "is-valid" : "is-invalid") : ""}`}
          type="number"
          value={age}
          onChange={(e) => handleAgeChange(Number(e.target.value))}
          min={18}
          max={99}
          placeholder="Возраст"
          disabled={isUserCreating}
        />

        

        <span className="text-nowrap">Гражданин РФ </span>

        <input
          className="form-check-input"
          type="checkbox"
          checked={isCitizen}
          onChange={(e) => setIsCitizen(e.target.checked)}
          disabled={isUserCreating}
        />

      </div>

      <button
        disabled={isUserCreating || !isFirstNameValid.isValid || !isLastNameValid.isValid || !isPhoneNumberValid || !isAgeValid} // isPatronymicValid убрала блокировку кнопки на отчество 
        onClick={hadnleCreate}
        className={`btn btn-${editedUser ? "primary" : "success"}`}
      >
        {isUserCreating ? `${editedUser ? "Сохранение..." : "Добавление..."}`
        : `${editedUser ? "Сохранить" : "Добавить"}`
        }
      </button>

      {editedUser &&(
        <button 
        onClick={onClick}
        disabled={isUserCreating} 
        className="btn btn-danger">Отмена</button>
      )}
      

    </div>
  );
};
