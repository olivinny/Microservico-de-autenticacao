import express, { Request, Response, NextFunction } from "express";

const app = express();
const path = "http://localhost";
const port = 3000;

app.get(
  "/status",
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send({ foo: "sucesso total" });
  }
);

app.listen(port, () => {
  console.log(`Aplicação executando em ${path}:${port}`);
});
