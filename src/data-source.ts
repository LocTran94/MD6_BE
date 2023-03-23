import "reflect-metadata";
import { DataSource } from "typeorm";
import {User} from "./model/user";
import {Post} from "./model/post";
import {Provision} from "./model/provision";
import {Orders} from "./model/order";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "love",
    synchronize: true,
    logging: false,
    entities: [User,Post,Provision,Orders]

})