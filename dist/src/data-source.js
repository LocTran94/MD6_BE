"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./model/user");
const post_1 = require("./model/post");
const provision_1 = require("./model/provision");
const order_1 = require("./model/order");
const personal_1 = require("./model/personal");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "love",
    synchronize: true,
    logging: false,
    entities: [user_1.User, post_1.Post, provision_1.Provision, order_1.Orders, personal_1.Personal]
});
//# sourceMappingURL=data-source.js.map