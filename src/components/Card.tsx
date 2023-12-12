import "./Card.css";
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
      className="card"
      onClick={() => handler(card)}
      disabled={card.matched}
    >
      <div className={`${flipped && "card__flipped"}`}>
        <div className="card__front" />
        <div className="card__reveal">{card.emoji}</div>
      </div>
    </button>
  );
};

export default Card;
