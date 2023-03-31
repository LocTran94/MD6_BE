import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  idOrder: number;
  @Column()
  idUser: number;
  @Column()
  idPost: string;
  @Column({ type: "text" })
  endTime: string;
  @Column({ type: "text" })
  startTime: string;
  @Column({ default: "Wait" })
  statusOrder: string;
  @Column({
    nullable: false,
    default: () => "DATE_ADD(NOW())",
    type: "timestamp",
  })
  dateOfOrder: Date;
  @Column()
  total: number;

}
