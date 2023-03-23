import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Personal {
    @PrimaryGeneratedColumn()
    idPersonalService: number;
    @Column()
    idPost:  number;
    @Column()
    idProvision:  number;
}