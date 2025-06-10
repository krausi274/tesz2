import { Request, Response } from "express";
import { AppDataSource } from "../database";
import { Person } from "../entities/person";

export class PersonController {
  async getAllPersons(req: Request, res: Response) {
    try {
      const personRepository = AppDataSource.getRepository(Person);
      const persons = await personRepository.find({ relations: ["adresse"] });
      res.json(persons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPersonByID(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const personRepository = AppDataSource.getRepository(Person);
      const person = await personRepository.findOne({
        where: { id },
        relations: ["adresse"],
      });
      if (!person) {
        res.status(404).send("Person not found");
        return;
      }
      res.json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPersonWithDetailsByID(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const personRepository = AppDataSource.getRepository(Person);
      const person = await personRepository.findOne({
        where: { id },
        relations: [
          "adresse",
          "reiseziel",
          "verifizierung",
          "meta_daten",
          "interessen_hobby",
          "chats",
        ],
      });
      if (!person) {
        res.status(404).send("Person not found");
        return;
      }

      res.json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addPerson(req: Request, res: Response) {
    try {
      const personRepository = AppDataSource.getRepository(Person);
      const personData = req.body;

      const newPerson = personRepository.create(personData);
      const savedPerson = await personRepository.save(newPerson);

      res.status(201).json(savedPerson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      const personRepository = AppDataSource.getRepository(Person);
      const id = req.params.id;
      const personData = req.body;

      const person = await personRepository.findOne({ where: { id } });
      if (!person) {
        res.status(404).send("Person not found");
        return;
      }

      personRepository.merge(person, personData);
      const updatedPerson = await personRepository.save(person);

      res.status(200).json(updatedPerson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deletePerson(req: Request, res: Response) {
    try {
      const personRepository = AppDataSource.getRepository(Person);
      const id = req.params.id;

      const person = await personRepository.findOne({ where: { id } });
      if (!person) {
        res.status(404).send("Person not found");
        return;
      }
      await personRepository.remove(person);
      res.status(200).send("Person deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
