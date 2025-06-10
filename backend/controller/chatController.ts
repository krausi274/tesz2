import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Chat } from "../entities/chat";
import { Person } from "../entities/person";
import { In } from "typeorm";

export class ChatController {
  // Alle Chats einer Person (mit Teilnehmern und Nachrichten)
  async getChatsByPersonId(req: Request, res: Response) {
    try {
      const personId = req.params.id;
      const chatRepository = AppDataSource.getRepository(Chat);
      const chats = await chatRepository
        .createQueryBuilder("chat")
        .leftJoin("chat.participants", "person")
        .where("person.id = :personId", { personId })
        .select(["chat.id"])
        .getMany();

      // Extrahiere nur die IDs
      const chatIds = chats.map((chat) => ({ id: chat.id }));

      res.json(chatIds);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Alle Nachrichten eines Chats
  async getMessagesByChatId(req: Request, res: Response) {
    try {
      const chatId = req.params.id;
      const chatRepository = AppDataSource.getRepository(Chat);
      const chat = await chatRepository.findOne({
        where: { id: chatId },
        relations: ["messages", "messages.sender"],
      });

      if (!chat) {
        res.status(404).json({ error: "Chat not found" });
        return;
      }

      res.json(chat.messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getChatById(req: Request, res: Response) {
    try {
      const chatId = req.params.chatId;
      const chatRepository = AppDataSource.getRepository(Chat);
      const chat = await chatRepository.findOne({
        where: { id: chatId },
        relations: ["participants", "messages", "messages.sender"],
      });
      if (!chat) {
        res.status(404).send("Chat not found");
        return;
      }
      res.json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createChat(req: Request, res: Response) {
    try {
      const { participantIds, message, senderId } = req.body;
      if (!participantIds || !Array.isArray(participantIds) || participantIds.length < 2) {
        return res.status(400).json({ error: "At least two participantIds required" });
      }
      if (!message || !senderId) {
        return res.status(400).json({ error: "Message and senderId required" });
      }

      const personRepo = AppDataSource.getRepository(Person);
      const messageRepo = AppDataSource.getRepository("Message");
      const chatRepo = AppDataSource.getRepository(Chat);

      // Teilnehmer laden
      const participants = await personRepo.findBy({
        id: In(participantIds)
      });

      if (participants.length !== participantIds.length) {
        return res.status(404).json({ error: "One or more participants not found" });
      }

      // Prüfen, ob ein Chat mit genau diesen Teilnehmern existiert
      const existingChats = await chatRepo
        .createQueryBuilder("chat")
        .leftJoinAndSelect("chat.participants", "person")
        .where("person.id IN (:...ids)", { ids: participantIds })
        .getMany();

      const chatExists = existingChats.some(chat => {
        const chatParticipantIds = chat.participants.map(p => p.id).sort();
        return (
          chatParticipantIds.length === participantIds.length &&
          chatParticipantIds.every((id, idx) => id === participantIds.sort()[idx])
        );
      });

      if (chatExists) {
        return res.status(409).json({ error: "Chat between these participants already exists" });
      }

      // Chat anlegen
      const chat = new Chat();
      chat.participants = participants;
      chat.messages = [];
      await chatRepo.save(chat);

      // Erste Nachricht anlegen
      const sender = participants.find(p => p.id === senderId);
      if (!sender) {
        return res.status(400).json({ error: "Sender must be one of the participants" });
      }

      const newMessage = messageRepo.create({
        content: message,
        timestamp: new Date(),
        sender: sender,
        chat: chat,
      });

      await messageRepo.save(newMessage);

      // Chat mit Nachrichten zurückgeben
      const createdChat = await chatRepo.findOne({
        where: { id: chat.id },
        relations: ["participants", "messages", "messages.sender"],
      });

      res.status(201).json(createdChat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addMessageToChat(req: Request, res: Response) {
    try {
      const { chatId, senderId, content } = req.body;
      if (!chatId || !senderId || !content) {
        return res.status(400).json({ error: "chatId, senderId, and content are required" });
      }

      const chatRepo = AppDataSource.getRepository(Chat);
      const personRepo = AppDataSource.getRepository(Person);
      const messageRepo = AppDataSource.getRepository("Message");

      const chat = await chatRepo.findOne({ where: { id: chatId } });
      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      const sender = await personRepo.findOne({ where: { id: senderId } });
      if (!sender) {
        return res.status(404).json({ error: "Sender not found" });
      }

      const newMessage = messageRepo.create({
        content,
        timestamp: new Date(),
        sender,
        chat,
      });

      await messageRepo.save(newMessage);

      // Optional: Chat mit allen Nachrichten zurückgeben
      const updatedChat = await chatRepo.findOne({
        where: { id: chatId },
        relations: ["participants", "messages", "messages.sender"],
      });

      res.status(200).json(updatedChat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
