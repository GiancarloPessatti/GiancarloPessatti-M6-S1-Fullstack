export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactUpdate {
  name?: string;
  phone?: string;
  email?: string;
}
