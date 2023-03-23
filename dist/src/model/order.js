"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
let Orders = class Orders {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "idOrder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "idPost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Orders.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Orders.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Wait" }),
    __metadata("design:type", String)
], Orders.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: () => 'DATE_ADD(NOW())',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Orders.prototype, "dateOfOrder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Orders.prototype, "total", void 0);
Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
exports.Orders = Orders;
//# sourceMappingURL=order.js.map