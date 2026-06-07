export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  age: number;
  isCitizen: boolean;
  createDate: string;
  resumePath: string;
  
  
}

export interface VacancyModel {
  id: number;
title: string;
city: string;
salary: number
  
  
}

export interface CreateUserInput {
  id : number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  age: number;
  isCitizen: boolean;
  resume: string;
  
  
}

 export interface CreateVacancyInput{
    id: number,
    title : string,
    city: string,
    salary: number,
    isCityzen: boolean,
    userId: number,
    description: string;
    
  }

export interface TextValidation {
  isLenghtValid: boolean;
  isSpecialSymbolValid: boolean;
  isTextEmptyValid: boolean;
  isFirstUpperCaseValid: boolean;
  isValid: boolean;
  isTouched: boolean;
}

interface BaseField{
  isValid: boolean;
  isTouched: boolean;
  errors: string[];
}

export interface TextField extends BaseField{
  text: string;
}

export interface NumberField extends BaseField {
  number: number | null;
}

export interface CheckboxField extends BaseField {
  status: boolean;
}
