import { User } from "../entity/users";
import { IUserRepository } from "../interfaces/userRepository";

export class UserMemoryRepository implements IUserRepository {
    private db: User[];

    public constructor(db: any) {
        this.db = db;
    }

    getUsers(): User[] {
        return this.db;
    }

    getUserById(id: number) {
        return this.db.find((user: User) => user.id === id);
    }

    insertUser(user: User) {
        this.db.push(user);
    }

    updateUser(updatedUser: User) {
        const index = this.db.map((user: User) => user.id).indexOf(updatedUser.id);

        if (index !== -1) {
            this.db[index] = updatedUser;
        }
    }

    deleteUser(user: User) {
        const index = this.db.map((user: User) => user.id).indexOf(user.id);

        if (index !== -1) {
            this.db.splice(index, 1);
        }
    }
}