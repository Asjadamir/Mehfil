import express from "express";
import { PORT } from "./src/config/env.js";
import dbConnect from "./src/utils/dbConnect.js";
import userRouter from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { SocketHandler } from "./src/sockets/index.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
await dbConnect();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
SocketHandler(io);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});
app.use("/api/users", userRouter);

server.listen(PORT, () => console.log("listening on port " + PORT));
