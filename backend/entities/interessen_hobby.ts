import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Interessen_Hobby {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sport: boolean;

  @Column()
  brettspiele: boolean;

  @Column()
  kochen: boolean;

  @Column()
  club: boolean;
}
