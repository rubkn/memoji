import { useEffect, useState } from "react";
import { EmojiCard } from "./lib/types";
import EMOJIS from "./constants/emojis";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState<EmojiCard[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<EmojiCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<EmojiCard | null>(null);

  const shuffle = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setScore(0);
    setTurns(0);
  };

  const handleChoice = (card: EmojiCard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.emoji.codePointAt(0) === choiceTwo.emoji.codePointAt(0)) {
        setCards((prev) => {
          return prev.map((card) => {
            return card.emoji.codePointAt(0) === choiceOne.emoji.codePointAt(0)
              ? { ...card, matched: true }
              : card;
          });
        });

        setScore((prev) => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log("cards", cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <>
      <header className="flex flex-col items-center justify-center space-y-4 py-12 md:p-6 lg:p-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to Memoji
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Test your memory and have fun! <br />
          Click 'New Game' to start.
        </p>
        <button
          onClick={shuffle}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          New Game
        </button>
      </header>
      <main className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handler={handleChoice}
          />
        ))}
        {/* {`turns: ${turns}`}
        <br />
        {`score: ${score}`} */}
      </main>
    </>
  );
}

export default App;
