import { Categories } from "./Categories";
import { Users } from "./Users";

export interface Blogs{
    id?: number;
    title?: string;
    beginDate?: string;
    content?: string;
    status?: number;
    user?: Users;
    category?: Categories;
}