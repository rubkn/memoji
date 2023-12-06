import { useEffect, useState } from "react";
import "./App.css";
import EMOJIS from "./constants/emojis";
import { v4 as uuidv4 } from "uuid";

type EmojiCard = {
  id: string;
  emoji: string;
};

function App() {
  const [cards, setCards] = useState<EmojiCard[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<EmojiCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<EmojiCard | null>(null);

  const doCardsMatch =
    choiceOne?.emoji.codePointAt(0) === choiceTwo?.emoji.codePointAt(0);

  console.log(cards, turns);
  console.log("match??", doCardsMatch);

  const shuffle = () => {
    const emojiCard: EmojiCard[] = EMOJIS.map((emoji) => ({
      id: uuidv4(),
      emoji: emoji,
    }));

    const shuffled = [...emojiCard, ...emojiCard]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: `${card.id}-${index}` }));

    setCards(shuffled);
    setTurns(0);
  };

  const handleChoice = (card: EmojiCard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    console.log("choice 1", choiceOne);
    console.log("choice 2", choiceTwo);
    if (!(choiceOne && choiceTwo)) return;

    if (doCardsMatch) {
      setCards((prev) => {
        return prev.map((card) => {
          if (card.emoji.codePointAt(0) !== choiceOne.emoji.codePointAt(0)) {
            return card;
          }

          return { ...card, matched: true };
        });
      });
    } else {
      resetTurn();
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    if (!doCardsMatch) return;

    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <main>
      <section className="header">
        <h1>Memoji</h1>
        <button onClick={shuffle}></button>
      </section>
      <section className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleChoice(card)}
          >
            {card.emoji}
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
