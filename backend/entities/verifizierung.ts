import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Verifizierung {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  reisepass: string;

  @Column()
  videoauth_bonus: boolean;
}
