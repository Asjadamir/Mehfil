import express from "express";
import { PORT } from "./src/config/env.js";
import dbConnect from "./src/utils/dbConnect.js";
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

await dbConnect();

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("listening on port " + PORT));
