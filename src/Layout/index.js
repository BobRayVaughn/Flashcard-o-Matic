import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "./Header";
import HomeView from "./Home/HomeView";
import { listDecks, deleteDeck } from "../utils/api/index";
import "../App.css";

function Layout() {
  const [decks, setDecks] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    const loadDecks = async () => {
      const data = await listDecks(abortController.signal);
      setDecks(data);
    };

    loadDecks();

    return () => {
      abortController.abort();
    };
  }, [location]);

  const handleDeleteDeck = async (deckId) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if (result) {
      await deleteDeck(deckId, new AbortController().signal);
      const data = await listDecks(new AbortController().signal);
      setDecks(data);
      history.push("/");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <HomeView decks={decks} handleDeleteDeck={handleDeleteDeck} />
      </div>
    </>
  );
}

export default Layout;
