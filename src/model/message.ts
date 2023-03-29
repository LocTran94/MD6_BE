import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    idMessage: number
    @Column()
    idUser: number
    @Column()
    idPost: number;
    @Column({ type: "text" })
    content: string;
    @Column({
        nullable: false,
        default: () => 'DATE_ADD(NOW())',
        type: 'timestamp',
    })
    dateOfMessage: Date;

}