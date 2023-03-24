import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({ type: "text" })
    avatar: string;
    @Column({ default: "user" })
    role: string;
    @Column({ type: "text" })
    gmail: string;
    @Column( { default: "active" } )
    status: string;
    @Column({ type: "text" })
    birthday: string;
    @Column({ type: "text" })
    gender: string;
    @Column({ default: "No" })
    ask: string;
    @Column({ default: "Wait" })
    category: string;
    @Column({ default: "No" })
    addVip: string;
}