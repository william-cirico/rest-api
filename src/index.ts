import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import userRouter from "./route/userRoutes";

// Porta da API
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

// Rotas de usuários
app.use("/v1/users", userRouter);

// Middleware de tratamento de erros
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));