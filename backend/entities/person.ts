import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Adresse } from "./adresse";
import { Meta_Daten } from "./meta_daten";
import { Interessen_Hobby } from "./interessen_hobby";
import { Reiseziel } from "./reiseziel";
import { Verifizierung } from "./verifizierung";
import { Chat } from "./chat";
import { Message } from "./message";

@Entity()
export class Person {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  vorname: string;

  @Column()
  nachname: string;

  @Column()
  geburtstag: string;

  @Column()
  email: string;

  @Column()
  passwort: string;

  @Column()
  geschlecht: string;

  @OneToOne(() => Adresse, { cascade: true })
  @JoinColumn()
  adresse: Adresse;

  @OneToOne(() => Meta_Daten, { cascade: true })
  @JoinColumn()
  meta_daten: Meta_Daten;

  @OneToOne(() => Interessen_Hobby, { cascade: true })
  @JoinColumn()
  interessen_hobby: Interessen_Hobby;

  @OneToOne(() => Reiseziel, { cascade: true })
  @JoinColumn()
  reiseziel: Reiseziel;

  @OneToOne(() => Verifizierung, { cascade: true })
  @JoinColumn()
  verifizierung: Verifizierung;

  @ManyToMany(() => Chat, chat => chat.participants)
  chats: Chat[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];
}
