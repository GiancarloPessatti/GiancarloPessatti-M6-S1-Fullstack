export interface IContactRequest {
  name: string;
  email: string;
  phone: number;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactUpdate {
  name?: string;
  phone?: number;
  email?: string;
}
