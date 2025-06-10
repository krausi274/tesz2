import { AppDataSource } from "./database";
import { Person } from "./entities/person";
import { Adresse } from "./entities/adresse";
import { Meta_Daten } from "./entities/meta_daten";
import { Interessen_Hobby } from "./entities/interessen_hobby";
import { Reiseziel } from "./entities/reiseziel";
import { Verifizierung } from "./entities/verifizierung";
import { Chat } from "./entities/chat";
import { Message } from "./entities/message";

async function populate() {
  await AppDataSource.initialize();

  // Adressen
  const adressen = [
    { strasse: "Hauptstraße", hausnummer: "1", plz: "12345", stadt: "Berlin" },
    { strasse: "Bahnhofstraße", hausnummer: "2", plz: "23456", stadt: "München" },
    { strasse: "Ringstraße", hausnummer: "3", plz: "34567", stadt: "Hamburg" },
    { strasse: "Gartenweg", hausnummer: "4", plz: "45678", stadt: "Köln" },
  ].map(data => Object.assign(new Adresse(), data));

  // Meta-Daten
  const metaDaten = [
    { rauchen: false, trinken: true, religioes: false },
    { rauchen: true, trinken: false, religioes: false },
    { rauchen: false, trinken: false, religioes: true },
    { rauchen: false, trinken: true, religioes: true },
  ].map(data => Object.assign(new Meta_Daten(), data));

  // Interessen/Hobby
  const interessen = [
    { sport: true, brettspiele: false, kochen: true, club: false },
    { sport: false, brettspiele: true, kochen: false, club: true },
    { sport: true, brettspiele: true, kochen: false, club: false },
    { sport: false, brettspiele: false, kochen: true, club: true },
  ].map(data => Object.assign(new Interessen_Hobby(), data));

  // Reiseziele
  const reiseziele = [
    { citytrip: true, strandurlaub: false, kreuzfahrt: false, berge: true, ist_mir_egal: false },
    { citytrip: false, strandurlaub: true, kreuzfahrt: true, berge: false, ist_mir_egal: false },
    { citytrip: true, strandurlaub: true, kreuzfahrt: false, berge: false, ist_mir_egal: false },
    { citytrip: false, strandurlaub: false, kreuzfahrt: true, berge: true, ist_mir_egal: true },
  ].map(data => Object.assign(new Reiseziel(), data));

  // Verifizierung
  const verifizierungen = [
    { reisepass: "123456789", videoauth_bonus: true },
    { reisepass: "987654321", videoauth_bonus: false },
    { reisepass: "456789123", videoauth_bonus: true },
    { reisepass: "789123456", videoauth_bonus: false },
  ].map(data => Object.assign(new Verifizierung(), data));

  // Personen
  const personen = [
    {
      vorname: "Justin",
      nachname: "Perrone",
      geburtstag: "1990-01-01",
      email: "justin@example.com",
      passwort: "test123",
      geschlecht: "m",
      adresse: adressen[0],
      meta_daten: metaDaten[0],
      interessen_hobby: interessen[0],
      reiseziel: reiseziele[0],
      verifizierung: verifizierungen[0],
    },
    {
      vorname: "Florian",
      nachname: "Timter",
      geburtstag: "1992-02-02",
      email: "florian@example.com",
      passwort: "test123",
      geschlecht: "m",
      adresse: adressen[1],
      meta_daten: metaDaten[1],
      interessen_hobby: interessen[1],
      reiseziel: reiseziele[1],
      verifizierung: verifizierungen[1],
    },
    {
      vorname: "Alicia",
      nachname: "Schelise",
      geburtstag: "1995-03-03",
      email: "alicia@example.com",
      passwort: "test123",
      geschlecht: "w",
      adresse: adressen[2],
      meta_daten: metaDaten[2],
      interessen_hobby: interessen[2],
      reiseziel: reiseziele[2],
      verifizierung: verifizierungen[2],
    },
    {
      vorname: "Franziska",
      nachname: "Kraus",
      geburtstag: "1998-04-04",
      email: "franziska@example.com",
      passwort: "test123",
      geschlecht: "w",
      adresse: adressen[3],
      meta_daten: metaDaten[3],
      interessen_hobby: interessen[3],
      reiseziel: reiseziele[3],
      verifizierung: verifizierungen[3],
    },
  ].map(data => Object.assign(new Person(), data));

  // Chats
  const chat1 = new Chat();
  chat1.participants = [personen[0], personen[1]];

  const chat2 = new Chat();
  chat2.participants = [personen[2], personen[3]];

  // Messages
  const message1 = new Message();
  message1.content = "Hallo Florian!";
  message1.timestamp = new Date();
  message1.sender = personen[0];
  message1.chat = chat1;

  const message2 = new Message();
  message2.content = "Hi Justin!";
  message2.timestamp = new Date();
  message2.sender = personen[1];
  message2.chat = chat1;

  const message3 = new Message();
  message3.content = "Hey Franziska!";
  message3.timestamp = new Date();
  message3.sender = personen[2];
  message3.chat = chat2;

  chat1.messages = [message1, message2];
  chat2.messages = [message3];

  // Speichern
  await AppDataSource.manager.save([
    ...adressen,
    ...metaDaten,
    ...interessen,
    ...reiseziele,
    ...verifizierungen,
    ...personen,
    chat1,
    chat2,
    message1,
    message2,
    message3,
  ]);

  console.log("Testdaten erfolgreich eingefügt!");
  process.exit(0);
}

populate().catch((err) => {
  console.error("Fehler beim Einfügen der Testdaten:", err);
  process.exit(1);
});
