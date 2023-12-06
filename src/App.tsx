import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EMOJIS from "./constants/emojis";
import { v4 as uuidv4 } from "uuid";

type EmojiCard = {
  id: string;
  emoji: string;
};

function App() {
  const [emojis, setEmojis] = useState<EmojiCard[]>([]);
  const [turns, setTurns] = useState<number>(0);

  const shuffle = () => {
    const emojiCard: EmojiCard[] = EMOJIS.map((emoji) => ({
      id: uuidv4(),
      emoji: emoji,
    }));

    const shuffled = [...emojiCard, ...emojiCard].sort(
      () => Math.random() - 0.5
    );

    setEmojis(shuffled);
    setTurns(0);
  };

  console.log(emojis, turns);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={shuffle}>count</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
