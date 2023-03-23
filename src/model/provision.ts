import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provision {
    @PrimaryGeneratedColumn()
    idProvision: number;
    @Column()
    provisionName: string;


}