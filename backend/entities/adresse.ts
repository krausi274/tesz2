import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Adresse {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  strasse: string;

  @Column()
  hausnummer: string;

  @Column()
  plz: string;

  @Column()
  stadt: string;
}