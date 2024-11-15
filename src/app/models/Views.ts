import { Blogs } from "./Blogs";
import { Users } from "./Users";

export interface Views {
    id?: number;
    amount?: number;
    blog_id?: Blogs;
    user_id?: Users;
}