import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface Comments{
    id?: number;
    content?: string;
    date?: string;
    blog?: Blogs;
    user?: Users;
}