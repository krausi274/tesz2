import { DataSource } from "typeorm";
import { Person } from "./entities/person";
import { Adresse } from "./entities/adresse";
import { Reiseziel } from "./entities/reiseziel";
import { Meta_Daten } from "./entities/meta_daten";
import { Verifizierung } from "./entities/verifizierung";
import { Interessen_Hobby } from "./entities/interessen_hobby";
import { Chat } from "./entities/chat";
import { Message } from "./entities/message";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "../database/travelmate_db.sqlite",
  synchronize: true,
  logging: true,
  entities: [Person, Adresse, Reiseziel, Meta_Daten, Verifizierung, Interessen_Hobby, Chat, Message],
});