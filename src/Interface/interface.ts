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
  nationality: string;
  countryFlag: string;
  password: string;
  role: string;
  profilePicture: string;
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
  dealId: number;
  hasSmoking: number;
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
  totalBookings: number;
  features?: string[];
  isAnimalFriendly: boolean;
}

export interface IFilters {
  maxCapacity?: number[];
  features?: number[];
  priceRange?: { min: number; max: number };
  discount?: 'true' | 'false';
}
export interface IReadCabin {
  id: number;
  createdAt: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  cabinImage: string;
  totalBookings: number;
  features?: string;
  isAnimalFriendly: boolean;
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
  status?: 'checked-in' | 'checked-out' | 'unconfirmed';
}
export interface IFood {
  id: number;
  name: string;
  price: number;
  image: string;
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

export interface IOrder {
  id: number;
  bookingId: number;
  items: {
    itemId: number;
    price: number;
    quantity: number;
  }[];
}
