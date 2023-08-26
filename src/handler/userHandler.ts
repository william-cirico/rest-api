import { Request, Response } from "express";
import createError from "http-errors";
import { User } from "../entity/users";
import { IUserRepository } from "../interfaces/userRepository";

export class UserHandler {
    private userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public getUsers(req: Request, res: Response) {
        const users = this.userRepository.getUsers();

        res.json(users);
    }

    public getUserById(req: Request, res: Response) {
        const id = +req.params.id;

        const user = this.userRepository.getUserById(id);
        if (!user) {
            throw createError(404, "usuário não foi encontrado");
        }

        res.json(user);
    }
 
    public createUser(req: Request, res: Response) {
        const { name, email, password, cpf, phone } = req.body;

        const newUser = new User(name, email, password, cpf, phone);
        this.userRepository.insertUser(newUser);

        res.status(201).json(newUser);
    }

    public updateUser(req: Request, res: Response) {
        const id = +req.params.id;

        const user = this.userRepository.getUserById(id);
        if (!user) {
            throw createError(404, "usuário não encontrado");
        }

        const { phone } = req.body;
        user.phone = phone;

        this.userRepository.updateUser(user);

        res.json(user);
    }

    public deleteUser(req: Request, res: Response) {
        const id = +req.params.id;

        const user = this.userRepository.getUserById(id);
        if (!user) {
            throw createError(404, "usuário não encontrado");
        }

        this.userRepository.deleteUser(user);

        res.status(204).end();
    }
}