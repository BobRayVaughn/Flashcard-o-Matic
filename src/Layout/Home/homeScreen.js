import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../../utils/api/index.js";
import { useHistory } from "react-router-dom";

function HomeScreen() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  
  async function loadDecks() {
    const deckData = await listDecks();
    setDecks(deckData);
  }
  
  const deckDelete = async (Id) => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(Id);
      loadDecks();
    }
  };
  useEffect(() => {
    loadDecks();
  }, []);

  return (
    <div>
      <button onClick={() => history.push(`/decks/new`)}>Create Deck</button>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <h2>{deck.name}</h2>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <button onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
            <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
            <button onClick={() => deckDelete(deck.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default HomeScreen;