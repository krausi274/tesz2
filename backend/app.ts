import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ChatController } from "./controller/chatController";
import { PersonController } from "./controller/personController";
import { AppDataSource } from "./database";

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personController = new PersonController();
const chatController = new ChatController();

// Middleware for logging requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(
    `[${new Date().toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}] ${req.method} ${req.originalUrl}`
  );
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request Body:", req.body);
  }
  next();
});

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully");
    
    // Person related routes
    app.get("/person", (req: express.Request, res: express.Response) =>
      personController.getAllPersons(req, res)
    );
    app.get("/person/:id", (req: express.Request, res: express.Response) =>
      personController.getPersonByID(req, res)
    );
    app.get("/person/:id/details", (req: express.Request, res: express.Response) =>
      personController.getPersonWithDetailsByID(req, res)
    );
    app.post("/person", (req: express.Request, res: express.Response) =>
      personController.addPerson(req, res)
    );
    app.put("/person/:id", (req: express.Request, res: express.Response) =>
      personController.updatePerson(req, res)
    );
    app.delete("/person/:id", (req: express.Request, res: express.Response) =>
      personController.deletePerson(req, res)
    );

    // Chat related routes
    app.get("/chats/:id", (req: express.Request, res: express.Response) =>
      chatController.getChatsByPersonId(req, res)
    );
    app.get("/messages/:id", (req: express.Request, res: express.Response) =>
      chatController.getMessagesByChatId(req, res)
    );
    app.post("/chat", (req: express.Request, res: express.Response) =>
      chatController.createChat(req, res)
    );
    app.put("/chat/message", (req: express.Request, res: express.Response) =>
      chatController.addMessageToChat(req, res)
    );

    // Error handling middleware
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('❌ Server Error:', err);
      res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
      });
    });

    // 404 handler
    app.use('*', (req: express.Request, res: express.Response) => {
      res.status(404).json({ 
        error: 'Route not found',
        path: req.originalUrl 
      });
    });

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📊 Health check: http://localhost:${port}/health`);
      console.log(`👥 API endpoints: http://localhost:${port}/person`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });