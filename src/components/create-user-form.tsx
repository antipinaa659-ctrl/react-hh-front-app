import { useState, useEffect, useRef } from "react";
import type {
  CheckboxField,
  CreateUserInput,
  NumberField,
  TextField,
  UserModel,
} from "../lib/types";
import { useCreateUser } from "../api-methods/create-user";
import { useGetUsers } from "../api-methods/get-user";
import { Container } from "../shared/container";
import { TextInput } from "../shared/text-input";
import { NumberInput } from "../shared/number-input ";
import { CheckBoxInput } from "../shared/checkbox-input";
import { Row } from "../shared/row";
import { Column } from "../shared/column";
import { PhoneInput } from "../shared/phone-input";

interface CreateFormProps {
  editedUser: UserModel | null;
  onClick: () => void;
}

const DEFAULT_FIRST_NAME = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;

const DEFAULT_LAST_NAME = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;

const DEFAULT_PATRONYMIC = {
  text: "",
  isTouched: false,
  isValid: false,
} as TextField;

const DEFAULT_AGE = {
  number: null,
  isTouched: false,
  isValid: false,
} as NumberField;

const DEFAULT_CITIZEN = {
  status: false,
  isTouched: false,
  isValid: false,
} as CheckboxField;

const  DEFAULT_PHONE_NUMBER={
  text: "",
  isTouched: false,
  isValid: false,
}as TextField;

export const CreateUserForm = ({ editedUser, onClick }: CreateFormProps) => {
  const { refetch: refetchUsers } = useGetUsers();

  const { mutate: createUser, isPending: isUserCreating } = useCreateUser();

  const hadnleCreate = () => {
    const input = {
      id: editedUser?.id ?? -1,
      firstName: firstName.text,
      lastName: lastName.text,
      patronymic: patronymic.text,
      phoneNumber: "+7" + phoneNumber.text,
      age: age.number,
      isCitizen: isCitizen.status,
      resume: resume,
    } as CreateUserInput;

    createUser(input, { onSuccess: onCreateSuccess });
  };

  const onCreateSuccess = () => {
    resetForm();
    refetchUsers();
    onClick();
  };

  const resetForm = () => {
    setFirstName(DEFAULT_FIRST_NAME);

    setLastName(DEFAULT_LAST_NAME);

    setPatronymic(DEFAULT_PATRONYMIC);

    setPhoneNumber(DEFAULT_PHONE_NUMBER);
    
    setAge(DEFAULT_AGE);

    setIsCitizen(DEFAULT_CITIZEN);

    setResumeValid(false);
    setIsResumeTouched(false);
    setResume(null);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const [firstName, setFirstName] = useState<TextField>(DEFAULT_FIRST_NAME);

  const [lastName, setLastName] = useState<TextField>(DEFAULT_LAST_NAME);

  const [patronymic, setPatronymic] = useState<TextField>(DEFAULT_PATRONYMIC);

  const [phoneNumber, setPhoneNumber] = useState<TextField>(DEFAULT_PHONE_NUMBER);
  

  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [isResumeValid, setResumeValid] = useState<boolean>();
  const [isResumeTouched, setIsResumeTouched] = useState<boolean>(false);

  const [age, setAge] = useState<NumberField>(DEFAULT_AGE);

  const [isCitizen, setIsCitizen] = useState<CheckboxField>(DEFAULT_CITIZEN);

  useEffect(() => {
    if (!editedUser) {
      resetForm();

      return;
    }

    setFirstName({
      text: editedUser?.firstName ?? "",
      isTouched: true,
      isValid: true,
    } as TextField);

    setLastName({
      text: editedUser?.lastName ?? "",
      isTouched: true,
      isValid: true,
    } as TextField);

    setAge({
      number: editedUser.age,
      isTouched: true,
      isValid: true,
    } as NumberField);

    setPatronymic({
      text: editedUser?.patronymic ?? "",
      isTouched: true,
      isValid: true,
    } as TextField);

    setPhoneNumber({
      text: editedUser?.phoneNumber,
      isTouched: true,
      isValid: true,
    }as TextField);

    setIsCitizen({
      status: editedUser?.isCitizen,
      isTouched: true,
      isValid: true,
    } as CheckboxField);

    setResume(editedUser?.resume);

    

    setResumeValid(true);
    setIsResumeTouched(true);
  }, [editedUser?.id]);

  const handleOnNameChange = (text: string) => {
    const errosMsgs = [] as string[];

    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p3 = text !== ""; //текст не пустой
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase(); //текст с заглавной буквы

    if (!p1) {
      errosMsgs.push("Текст не может быть меньше 2 символов"); //дописать какие это ошибки + дописать эти ошибки для фамилии и отчества
    }

    if (!p2) {
      errosMsgs.push("Текст не должен содержать спец символы");
    }

    if (!p3) {
      errosMsgs.push("Поле не может быть пустым");
    }

    if (!p4) {
      errosMsgs.push("Текст с заглавной буквы");
    }

    setFirstName({
      text: text,
      isTouched: true,
      isValid: p1 && p2 && p3 && p4,
      errors: errosMsgs,
    } as TextField);
  };

  const handleOnLastNameChange = (text: string) => {
    const errosMsgs = [] as string[];

    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p3 = text !== ""; //текст не пустой
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase(); //текст с заглавной буквы
    if (!p1) {
      errosMsgs.push("Текст не может быть меньше 2 символов"); //дописать какие это ошибки + дописать эти ошибки для фамилии и отчества
    }

    if (!p2) {
      errosMsgs.push("Текст не должен содержать спец символы");
    }

    if (!p3) {
      errosMsgs.push("Поле не может быть пустым");
    }

    if (!p4) {
      errosMsgs.push("Текст с заглавной буквы");
    }

    setLastName({
      text: text,
      isTouched: true,
      isValid: p1 && p2 && p3 && p4,
      errors: errosMsgs,
    } as TextField);
  };

  const handleOnPatronymicChange = (text: string) => {
    const errosMsgs = [] as string[];
    const p1 = text.length >= 2; //текст не меньше 2
    const p2 = /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(text); // не содержит спец символы
    const p3 = text !== ""; //текст не пустой
    const p4 =
      text !== undefined &&
      text.length > 0 &&
      text[0] === text[0].toUpperCase(); //текст с заглавной буквы

    if (!p1) {
      errosMsgs.push("Текст не может быть меньше 2 символов"); //дописать какие это ошибки + дописать эти ошибки для фамилии и отчества
    }

    if (!p2) {
      errosMsgs.push("Текст не должен содержать спец символы");
    }

    if (!p3) {
      errosMsgs.push("Поле не может быть пустым");
    }

    if (!p4) {
      errosMsgs.push("Текст с заглавной буквы");
    }

    setPatronymic({
      text: text,
      isTouched: true,
      isValid: p1 && p2 && p3 && p4,
      errors: errosMsgs,
    } as TextField);
  };

  const handleOnPhoneNumberChange = (phoneNumber: string) => {

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
    const errosMsgs = [] as string[];

    const p1 = (/^\d{10}$/.test(cleanPhoneNumber));

    if (!p1) {
      errosMsgs.push("Некорректый ввод");
    }


    setPhoneNumber({
      text: cleanPhoneNumber,
      isTouched: true,
      isValid: p1,
      errors: errosMsgs,

    }as TextField);
  };

  const handleAgeChange = (age: number | null) => {
    const errosMsgs = [] as string[];
    const p1 = age !== null;
    const p2 = age !== null && age >= 18 && age <= 99;

    if (!p1) {
      errosMsgs.push("Возраст обязателен");
    }

    if (p1 && !p2) {
      errosMsgs.push("Возраст должен быть от 18 до 99");
    }

    setAge({
      number: age,
      isValid: p1 && p2,
      isTouched: true,
      errors: errosMsgs,
    } as NumberField);
  };

  const handleDownloadFile = (f: File | null) => {
    setIsResumeTouched(true);

    if (f?.type !== "application/pdf") {
      setResumeValid(false);
      return;
    }
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      setResumeValid(false);
      return;
    }
    setResume(f.name);
    setResumeValid(true);
  };

  const handleDeleteResume = () => {
    setResume(null);
    setResumeValid(false);
    setIsResumeTouched(false);
  };

  const handleOnCitizenChange = (status: boolean) => {
    setIsCitizen({
      status: status,
      isTouched: true,
      isValid: true,
    } as CheckboxField);
  };

  return (
    <Container>

    <Column>
       <TextInput
        field={firstName}
        placeHolder="Имя"
        isDisabled={isUserCreating}
        onChange={handleOnNameChange}
      />
      <TextInput
        field={lastName}
        placeHolder="Фамилия"
        isDisabled={isUserCreating}
        onChange={handleOnLastNameChange}
      />
      <TextInput
        field={patronymic}
        placeHolder="Отчество"
        isDisabled={isUserCreating}
        onChange={handleOnPatronymicChange}
      />

      <PhoneInput
        field={phoneNumber}
         placeHolder="900 000 00 00"
        isDisabled={isUserCreating}
        onChange={handleOnPhoneNumberChange}
      />


      <Row>
        <NumberInput
          field={age}
          placeHolder="Возраст"
          onChange={handleAgeChange}
          isDisabled={isUserCreating}
          width={100}
        />

        <CheckBoxInput
          field={isCitizen}
          onChange={handleOnCitizenChange}
          isDisabled={isUserCreating}
          label="Гражданин РФ"
          width={150}
        />
      </Row>

      {resume && resume !== "" && (
        <div
          style={{ backgroundColor: "rgb(231,231,231) " }}
          className="w-100 p-2 rounded-2 d-flex flex-row align-items-center justify-content-between"
        >
          <span>{resume}</span>
          <button
            onClick={handleDeleteResume}
            className="btn btn-close"
          ></button>
        </div>
      )}

      {!resume && (
        <>
          <span className="mt-3">Прекрепите резюме в формате PDF</span>

          <input
            ref={inputRef}
            accept="application/pdf, .pdf"
            type="file"
            className={`form-control mb-3 ${isResumeTouched ? (isResumeValid ? "is-valid" : "is-invalid") : ""} `}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleDownloadFile(e.target.files[0]);
              }
            }}
          />
        </>
      )}

      {isResumeTouched && !isResumeValid && (
        <span className="text-danger">Файл не является PDF</span>
      )}

      <button
        disabled={
          isUserCreating ||
          !firstName.isValid ||
          !lastName.isValid ||
          !phoneNumber.isValid ||
          !age.isValid ||
          resume === null ||
          !isResumeValid
        } // isPatronymicValid убрала блокировку кнопки на отчество
        onClick={hadnleCreate}
        className={`btn btn-${editedUser ? "primary" : "success"}`}
      >
        {isUserCreating
          ? `${editedUser ? "Сохранение..." : "Добавление..."}`
          : `${editedUser ? "Сохранить" : "Добавить"}`}
      </button>

      {editedUser && (
        <button
          onClick={onClick}
          disabled={isUserCreating}
          className="btn btn-danger"
        >
          Отмена
        </button>
      )}
    
    </Column>

     
    </Container>
  );
};
