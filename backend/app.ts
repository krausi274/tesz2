/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ChatController } from "./controller/chatController";
import { PersonController } from "./controller/personController";
import { AppDataSource } from "./database";

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const personController = new PersonController();
const chatController = new ChatController();

app.use(express.json());

// Middleware for logging requests
app.use((req: any, res: any, next: any) => {
  console.log(
    `[${new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}] Incoming request: ${req.method} ${req.originalUrl}`
  );
  if (req.body && Object.keys(req.body).length > 0) {
    // Check if there's a body
    console.log("Request Body:", req.body);
  }
  next();
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    // Person related zeug ---
    // GET
    app.get("/person", (req: any, res: any) =>
      personController.getAllPersons(req, res)
    );
    app.get("/person/:id", (req: any, res: any) =>
      personController.getPersonByID(req, res)
    );
    app.get("/person/:id/details", (req: any, res: any) =>
      personController.getPersonWithDetailsByID(req, res)
    );

    // POST
    app.post("/person", (req: any, res: any) =>
      personController.addPerson(req, res)
    );

    // PUT
    app.put("/person/:id", (req: any, res: any) =>
      personController.updatePerson(req, res)
    );

    // DELETE
    app.delete("/person/:id", (req: any, res: any) =>
      personController.deletePerson(req, res)
    );

    // Message related zeug ---
    // GET
    app.get("/chats/:id", (req: any, res: any) =>
      chatController.getChatsByPersonId(req, res)
    );

    // GET
    app.get("/messages/:id", (req: any, res: any) =>
      chatController.getMessagesByChatId(req, res)
    );

    // POST
    app.post("/chat", (req: any, res: any) =>
      chatController.createChat(req, res)
    );

    app.put("/chat/message", (req: any, res: any) =>
      chatController.addMessageToChat(req, res)
    );

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Database connection failed:", error));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
