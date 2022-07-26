import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api/index";
import "./Style.css";

export default function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const loadDecks = async () => {
      try {
        const deck = await listDecks(abortController.signal);
        setDecks(deck);
      } catch (error) {
        console.log(error);
      }
    };
    loadDecks();
    return () => abortController.abort();
  }, []);

  async function handleDeleteDeck(deckId) {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it`)
    ) {
      history.go(0);
      return await deleteDeck(deckId);
    }
  }

  const truncate = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className={"container"}>
      <Link className="btn btn-secondary m-3" to="/decks/new">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => (
          <div className="card cardstyle" key={deck.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{truncate(deck.name, 50)}</h5>
                <p
                  className="card-subtitle text-muted"
                  style={{ fontSize: "0.9rem" }}
                >
                  {deck.cards.length} cards
                </p>
              </div>
              <p className="card-text">{truncate(deck.description, 100)}</p>
              <div className="mt-2">
                <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                  <i className="fa-solid fa-eye" />
                  <span className="ml-1">View</span>
                </Link>
                <Link
                  className="btn btn-primary ml-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book" />
                  <span className="ml-1">Study</span>
                </Link>
                <button
                  className="btn btn-danger float-right"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
