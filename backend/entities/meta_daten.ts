import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Meta_Daten {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  rauchen: boolean;

  @Column()
  trinken: boolean;

  @Column()
  religioes: boolean;
}
