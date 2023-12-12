import "./App.css";

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

  /* const doCardsMatch =
    choiceOne?.emoji.codePointAt(0) === choiceTwo?.emoji.codePointAt(0); */

  /* console.log(cards, turns); */
  /* console.log("match??", doCardsMatch); */

  const shuffle = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffled);
    setScore(0);
    setTurns(0);
  };

  const handleChoice = (card: EmojiCard) => {
    /* console.log("card.id", card.id); */
    /* console.log("card", card); */
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /* console.log("1", choiceOne);
  console.log("2", choiceTwo); */

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
    <main>
      <section className="header">
        <h1>memoji</h1>
        <button onClick={shuffle}>new game</button>
      </section>
      <section className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handler={handleChoice}
          />
        ))}
        {`turns: ${turns}`}
        <br />
        {`score: ${score}`}
      </section>
    </main>
  );
}

export default App;
