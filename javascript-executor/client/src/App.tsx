import { useMemo, useState } from "react";
import logo from "./logo.svg";
import { io } from "socket.io-client";
import "./App.css";
import styled from "styled-components";
import { nanoid } from "nanoid";
import axios from "axios";
import "./App.css";

const socket = io("http://localhost:3001");

const SHeavyTask = styled.div`
  flex: 1;
  border: 1px solid pink;
  width: 20%;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const SApp = styled.div`
  margin: auto;
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeavyTask = ({
  value,
  resolved,
}: {
  value: string;
  resolved: string[];
}) => {
  const isDone = resolved.includes(value);

  return (
    <SHeavyTask>
      <span>{value}</span>
      {!isDone && <span className="loader" />}
    </SHeavyTask>
  );
};

function App() {
  const [resolved, setResolved] = useState<string[]>([]);

  socket.on("tasks", (data) => {
    setResolved((prev) => [...prev, data]);
  });

  const tasks = useMemo(() => [...Array(20).keys()].map(() => nanoid()), []);

  return (
    <SApp>
      <button onClick={() => axios.post("http://localhost:3001", tasks)}>
        Run heavy tasks
      </button>
      {tasks.map((v) => (
        <HeavyTask key={v} value={v} resolved={resolved} />
      ))}
    </SApp>
  );
}

export default App;
