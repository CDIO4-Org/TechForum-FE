import { Role } from "../Role";

export interface AccountListDto{
    id?: number;
    accountName?: string;
    status?: boolean;
    roles?: Role;
}