import { ReactNode } from "react";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  contacts?: IContact[];
}

export interface IUserRegister {
  name: string;
  email: string;
  phone: number;
  password: string;
}

export interface IUserContact {
  name: string;
  email: string;
  phone: number;
}

export interface IProviderProps {
  children: ReactNode;
}
