export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  age: number;
  isCitizen: boolean;
  createDate: string;
  resume: string;
  
  
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
