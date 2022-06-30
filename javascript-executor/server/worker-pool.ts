import { Worker } from "node:worker_threads";
import { TaskPool } from ".";
import { nanoid } from "nanoid";

interface WorkerPoolOptions {
  numberOfWorker: number;
  cb: (id: string, data: any) => void;
}

export class WorkerPool {
  private workers: Map<string, Worker> = new Map();
  private idleWorkers: string[] = [];
  private tasks: any[] = [];

  constructor(options: WorkerPoolOptions) {
    const { numberOfWorker, cb } = options;

    for (let i = 0; i < numberOfWorker; i++) {
      // create new worker
      const worker = new Worker("./executor.js");
      // receive result
      worker.on("message", (message) => {
        const { workerId, task } = message;

        // add it's self to idle queue
        this.idleWorkers.push(workerId);
        console.log(
          `${workerId} done task, add to queue ${JSON.stringify(
            this.idleWorkers
          )}`
        );
        cb(task, "done");

        this.runNext();
      });

      this.workers.set(nanoid(), worker);
    }

    const workerId = this.workers.keys();
    this.idleWorkers = [...workerId];
  }

  runNext() {
    if (this.tasks.length === 0 || this.idleWorkers.length === 0) {
      return;
    }

    const task = this.tasks.shift();
    // already check exist in if condition
    const workerId = this.idleWorkers.shift()!;

    // If workerId exist worker cannot undefined
    const worker = this.workers.get(workerId)!;

    worker.postMessage({
      workerId,
      task,
      data: Math.floor(Math.random() * 200),
    });

    this.runNext();
  }

  createTask(task: any) {
    this.tasks.push(task);
    this.runNext();
  }
}
