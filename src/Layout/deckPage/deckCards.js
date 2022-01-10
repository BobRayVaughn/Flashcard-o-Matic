import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";

export default function DeckCards({ cards, Id, path }) {
  const history = useHistory();
  

  const handleDelete = (card) => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      deleteCard(card.id);
    }
  };
  const cardDisplay = cards.map((card, index) => {
    return (
    <div key={index}>
      <div>
        <p>{card.front}</p>
      </div>
      <div>
        <p>{card.back}</p>
      </div>
      <div>
        <button
          onClick={() => history.push(`/decks/${Id}/cards/${card.id}/edit`)}
        >
          Edit
        </button>
        <button onClick={handleDelete}>
          <a href={path}> </a>
          Delete
        </button>
      </div>
    </div>
    )
  });

  if (cards.length) {
    return <div>{cardDisplay}</div>;
  } else {
    return "There are no cards in this deck yet!";
  }
}