import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personal {
    @PrimaryGeneratedColumn()
    idPersonalService: number;
    @Column()
    idUser:  number;
    @Column()
    idProvision:  string;
}