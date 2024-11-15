import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface Comments{
    id?: number;
    date?: string;
    content?: string;
    blog_id?: Blogs;
    user_id?: Users;
}