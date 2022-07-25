import express from "express";
import jwtAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware";
import errorHandler from "./middlewares/error-handlers.middleware";
import authorizationRoute from "./routes/authorization.routes";
import statusRoute from "./routes/status.routes";
import userRoute from "./routes/users.routes";

const app = express();
const path = "http://localhost";
const port = 3000;

// app config

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes config

app.use(statusRoute);
app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware, userRoute);

// error handler config

app.use(errorHandler);

// server init

app.listen(port, () => {
  console.log(`Aplicação executando em ${path}:${port}`);
});
