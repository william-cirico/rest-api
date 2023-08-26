import { cpf as CPFValidator } from "cpf-cnpj-validator";
import { phone as phoneValidator } from "phone";
import createError from "http-errors";

export class User {
    public id: number;
    public name: string;
    public email: string;
    private _password!: string;
    private _cpf!: string;
    private _phone!: string; 
    static counter: number = 0;

    public constructor(name: string, email: string, password: string, cpf: string, phone: string) {
        this.phone = phone;
        this.cpf = cpf;
        this.id = User.counter + 1;
        this.password = password;
        this.name = name;
        this.email = email;

        User.counter++;
    }

    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        if (password.length < 8) {
            throw createError(400, "senha inválida");
        }

        this._password = password;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public set cpf(cpf: string) {
        if (!CPFValidator.isValid(cpf)) {
            throw createError(400, "cpf inválido");
        }

        this._cpf = cpf;
    }

    public get phone(): string {
        return this._phone;
    } 

    public set phone(phone: string) {
        if (!phoneValidator(phone, { country: "BRA" }).isValid) {
            throw createError(400, "telefone inválido");
        }

        this._phone = phone;
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            cpf: this.cpf,
            phone: this.phone
        };
    }
}