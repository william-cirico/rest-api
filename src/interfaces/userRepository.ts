import { User } from "../entity/users";

export interface IUserRepository {
    getUsers(): User[];
    getUserById(id: number): User | undefined;
    insertUser(user: User): void;
    updateUser(user: User): void;
    deleteUser(user: User): void;
}