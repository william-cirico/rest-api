import express from "express";
import db from "../database";
import { UserHandler } from "../handler/userHandler";
import { UserMemoryRepository } from "../repository/userMemoryRepository";

const router = express.Router();

const userMemoryRepository = new UserMemoryRepository(db.users);
const userHandler = new UserHandler(userMemoryRepository);

console.log(userHandler);

router.get("/", userHandler.getUsers);
router.get("/:id", userHandler.getUserById);
router.post("/", userHandler.createUser);
router.put("/:id", userHandler.updateUser);
router.delete("/:id", userHandler.deleteUser);

export default router;