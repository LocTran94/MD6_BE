
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    idPost: number;
    @Column()
    namePost: string;
    @Column({type: 'text'})
    image: string;
    @Column({
        nullable: false,
        default: () => 'DATE_ADD(NOW())',
        type: 'timestamp',
    })
    date: Date;
    @Column()
    description: string;
    @Column()
    idUser: number;
    @Column()
    height: number;
    @Column()
    weight: number;
    @Column()
   measurement : string;
    @Column()
    price: number;
    @Column({default: 0})
    rent: number;
    @Column({default: 0})
    view: number;


}