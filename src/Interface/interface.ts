export interface ILogin {
  email: string;
  password: string;
}
export interface IUserDB {
  id: number;
  email: string;
  password: string;
}

export interface IUserSingUp {
  email: string;
  password: string;
  confirmPassword: string;
}
