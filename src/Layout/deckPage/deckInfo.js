import React from "react";
import {useHistory} from "react-router-dom"
import {deleteDeck} from "../../utils/api/index"

import DeckCards from "./deckCards"

export default function DeckInfo({ deckName, deckDescription, Id, cards, path}){
    const history = useHistory();
    const handleDelete = async (Id) => {
        if(window.confirm("Delete this deck? You will not be able to recover it"))
        {
            await deleteDeck(Id)
            history.push("/")
        }
    }


    return(
        <>
        <div>
            <h1>{deckName}</h1>
            <p>{deckDescription}</p>

            <button onClick={() => history.push(`/decks/${Id}/edit`)}>Edit</button>
            <button onClick={() => history.push(`/decks/${Id}/study`)}>Study</button>
            <button onClick={() => history.push(`/decks/${Id}/cards/new`)}>Add Cards</button>
            <button onClick={() => handleDelete(Id)}>Delete</button>
        </div>
        <div>
        <h2>Cards</h2>
        <DeckCards cards={cards} Id={Id} path={path}/>
        </div>
        </>
        
        
    )
}