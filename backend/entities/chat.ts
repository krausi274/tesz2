import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Person } from "./person";
import { Message } from "./message";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Teilnehmer des Chats (n:m)
  @ManyToMany(() => Person, person => person.chats)
  @JoinTable()
  participants: Person[];

  // Nachrichten im Chat (1:n)
  @OneToMany(() => Message, message => message.chat, { cascade: true })
  messages: Message[];
}