import { EmojiCard } from "../lib/types";

const Card = ({
  card,
  flipped,
  handler,
}: {
  card: EmojiCard;
  flipped: boolean;
  handler: (card: EmojiCard) => void;
}) => {
  return (
    <button
      className="relative flex h-16 w-16 items-center justify-center rounded-lg border-2 border-gray-300 p-2 text-2xl"
      onClick={() => handler(card)}
      disabled={card.matched}
    >
      <div
        className={`${
          !flipped &&
          "transition duration-300 ease-in-out [transform:rotateY(90deg)]"
        }`}
      >
        <div
          className={`flex items-center justify-center rounded-2xl ${
            !flipped && "[transform:rotateY(0deg)]"
          }`}
        >
          {card.emoji}
        </div>
      </div>
    </button>
  );
};

export default Card;
