import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./person";
import { Chat } from "./chat";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column()
  timestamp: Date;

  // Absender der Nachricht
  @ManyToOne(() => Person, { onDelete: "CASCADE" })
  sender: Person;

  // Zugehöriger Chat
  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: "CASCADE" })
  chat: Chat;
}
