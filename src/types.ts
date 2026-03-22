export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  age: number;
  isCitizen: boolean;
  createDate: string;
  
  
}

export interface CreateUserInput {
  id : number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phoneNumber: string;
  age: number;
  isCitizen: boolean;
  
  
}