import { Categories } from "./Categories";
import { Users } from "./Users";

export interface Blogs{
    id?: number;
    title?: string;
    beginDate?: string;
    content?: string;
    status?: boolean;
    user?: Users;
    category?: Categories;
}