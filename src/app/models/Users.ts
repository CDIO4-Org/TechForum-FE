import { Account } from "./Account";

export interface Users{
    id?: number;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: number;
    phoneNumber?: string;
    birthDate?: string;
    address?: string;
    accountId?: number;
}