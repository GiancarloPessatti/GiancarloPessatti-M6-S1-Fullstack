export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone: number;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  phone?: number;
  email?: string;
  password?: string;
}
