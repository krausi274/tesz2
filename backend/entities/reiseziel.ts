import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reiseziel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  citytrip: boolean;

  @Column()
  strandurlaub: boolean;

  @Column()
  kreuzfahrt: boolean;

  @Column()
  berge: boolean;

  @Column()
  ist_mir_egal: boolean;
}
