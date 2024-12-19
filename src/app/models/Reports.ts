import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface Reports{
    id?: number;
    content?: string;
    reportDate?: string;
    user?: Users;
    blog?: Blogs;
}