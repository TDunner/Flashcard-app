import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const initialState = {
    front: "",
    back: "",
  };

  const [card, setCard] = useState(initialState);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchData() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (card.front.length === 0) {
      alert("Front card is required");
    } else if (card.back.length === 0) {
      alert("Back card is required");
    } else {
      try {
        await createCard(deckId, card, signal);
        setCard(initialState);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="fa-solid fa-house" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} className="text-decoration-none">
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      </nav>
      <h1>
        <span>{deck.name}</span>
        <span>: Add Card</span>
      </h1>
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonGrayText={"Done"}
        buttonBlueText={"Save"}
      />
    </div>
  );
}
