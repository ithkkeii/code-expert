import express from "express";
import { WorkerPool } from "./worker-pool";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

export class TaskPool {
  private tasks: any[] = [];

  addTask(task: any) {
    this.tasks.push(task);
  }

  isOverheat(): boolean {
    return this.tasks.length > 100;
  }
}

const findFi = (n: number): number => {
  // Base Case
  if (n < 2) return 1;
  else return findFi(n - 1) + findFi(n - 2);
};

app.post("/", (req, res) => {
  const ids = req.body;

  const workerPool = new WorkerPool({
    numberOfWorker: 20,
    cb: (id, data) => {
      console.log("emit ", id, data);
      io.emit("tasks", id);
    },
  });

  for (let index = 0; index < ids.length; index++) {
    workerPool.createTask(ids[index]);
  }

  res.send("done");
});

httpServer.listen(3001, () => console.log("listening on port 3001."));
