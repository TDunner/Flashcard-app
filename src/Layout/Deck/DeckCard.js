import React from "react";
import { deleteCard } from "../../utils/api/index";
import { Link, useRouteMatch } from "react-router-dom";

export default function DeckCard({ id, front, back, updateCards }) {
  const { url } = useRouteMatch();
  const handleDelete = async () => {
    const toDelete = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (toDelete) {
      await deleteCard(id);
      updateCards(-1);
    }
  };
  return (
    <>
      <div className="card" style={{ width: "40rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <p className="card-text w-50">{front}</p>
            <p className="card-text w-50">{back}</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`${url}/cards/${id}/edit`}>
              <button className="btn btn-secondary mr-2">Edit</button>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
