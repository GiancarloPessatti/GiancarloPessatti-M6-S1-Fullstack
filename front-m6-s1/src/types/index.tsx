import { ReactNode } from "react"

export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRegister {
    name: string,
    email: string,
    phone: number,
    password: string
}

export interface IUserContact {
    name: string,
    email: string,
    phone: number,
}

export interface IProviderProps {
    children: ReactNode
}


export interface IUserName {
    name: string
}