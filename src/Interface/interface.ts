import { File } from 'buffer';

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
  createdAt: string;
  fullName: string;
  email: string;
  nationalId: string;
  natioanality: string;
  countryFlag: string;
}
export interface IUpdateGuest {
  createdAt?: string;
  fullName?: string;
  email?: string;
  nationalId?: string;
  natioanality?: string;
  countryFlag?: string;
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
  hasSmoking: boolean;
  dealId: number;
}
export interface IUpdateBooking {
  createdAt?: Date;
  startDate?: Date;
  endDate?: Date;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  status?: string;
  hasBreakFast?: boolean;
  isPaid?: boolean;
  observation?: boolean;
  cabinId?: number;
  guestId?: number;
}

export interface ICabin {
  id: number;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  cabinImage: string;
}
export interface IUpdateCabin {
  id?: number;
  createdAt?: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  cabinImage: File;
}
export interface IErrorField {
  field?: string;
  message: string;
}
export interface IError {
  [key: string]: string;
}
export interface CabinPaginatedResponse {
  cabins: ICabin[];
  count: number;
}

export interface IParamQuery {
  sort?: string;
  pageSize?: string;
  pageNumber?: string;
  sortBy?: 'asc' | 'desc';
}
export interface Iitem {
  price: number;
  picture: string;
  name: string;
  id: number;
}
export interface Ideal {
  dealId: number;
  itemId: number;
}
