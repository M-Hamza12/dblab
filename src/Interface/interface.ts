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
export interface IGuest {
  id: number;
  createdAt: Date;
  fullName: string;
  email: string;
  nationalId: string;
  natioanality: string;
  countryFlag: string;
}
export interface IBooking {
  id: number;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakFast: boolean;
  isPaid: boolean;
  observation: boolean;
  cabinId: number;
  guestId: number;
}

export interface ICabin {
  id: number;
  createdAt: Date;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}
export interface IErrorField {
  field?: string;
  message: string;
}
export interface IError {
  [key: string]: string;
}
