import express, { Request, Response } from "express";
import { addUser, deleteUser, getUsers } from "../controllers/userController";
const router = express.Router();

router.post("/users", (req: Request, res: Response) => addUser(req, res));
router.delete("/users/:id", (req: Request, res: Response) => deleteUser(req, res));
router.get("/users", (req: Request, res: Response) => getUsers(req, res));

export default router;