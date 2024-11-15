import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface BlogStorage{
    id?: number;
    date?: string;
    blog_id?: Blogs;
    user_id?: Users
}