import { Account } from "../Account";

export interface UserDto{
    id?: number;
    avaUrl?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    gender?: number;
    phoneNumber?: string;
    birthDate?: string;
    address?: string;
    account?: Account;
}