import React from "react";
import { useHistory } from "react-router-dom";

export default function CreateDeckCancelButton() {
  const history = useHistory();

  return (
    <button
      type="button"
      className="btn btn-secondary mr-2"
      onClick={() => history.push("/")}
    >
      Cancel
    </button>
  );
}