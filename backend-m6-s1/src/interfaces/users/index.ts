export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
}
