import React from "react";
import {useHistory} from "react-router-dom"

export default function AddCardsButton ({Id}){
    const history = useHistory();
    return(
        <button onClick={() => history.push(`/decks/${Id}/cards/new`)}>Add Cards</button>
    )
}