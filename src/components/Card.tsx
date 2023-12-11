import "./Card.css";
import { EmojiCard } from "../lib/types";

const Card = ({
  card,
  handler,
}: {
  card: EmojiCard;
  handler: (card: EmojiCard) => void;
}) => {
  return (
    <button
      className="card"
      onClick={(event) => handler(card, event)}
      data-id={card.id}
    >
      <div className="card__front">test</div>
      <div className="card__reveal">{card.emoji}</div>
    </button>
  );
};

export default Card;
