import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface Comments{
    id?: number;
    content?: string;
    date?: string;
    blog_id?: Blogs;
    user_id?: Users;
}