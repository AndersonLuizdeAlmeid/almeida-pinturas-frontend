export interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthdayDate: string;
  address: string;
  isActive: number;
}

export interface CreateUserRequest {
  User: User;
}
