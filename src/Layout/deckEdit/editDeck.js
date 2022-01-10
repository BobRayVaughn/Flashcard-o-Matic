import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom"
import {readDeck, updateDeck} from "../../utils/api/index"

import EditDeckNavBar from "./editDeckNB"


export default function EditDeck() {
  const history = useHistory();
    const deckId = useParams().deckId;
    const [deckName, setDeckName] = useState('')
    const [deckDescription, setDeckDescription] = useState('');

    useEffect(() => {
        async function loadDeck() {
            const deckData = await readDeck(deckId);
            setDeckName(deckData.name);
            setDeckDescription(deckData.description);
        }
        loadDeck();
    }, [deckId])
    
    const handleDeckNameChange = (event) => setDeckName(event.target.value);
    const handleDeckDescription = (event) => setDeckName(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateDeck({
            id: deckId,
            name: deckName,
            description: deckDescription,
        }).then((updatedDeck) => history.push(`/decks/${updatedDeck.id}`))
    }

    return(
        <div>
            <EditDeckNavBar deckName={deckName} Id={deckId} />

            <h1>Edit Deck</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="deckName">Name</label>
                    <textarea 
                    id="deckName"
                    rows="1"
                    name="deckName"
                    className="form-control"
                    onChange={handleDeckNameChange}
                    value={deckName}
                    />
                </div>
                <div>
                    <label htmlFor="deckDescription">Description</label>
                    <textarea
                    id="deckDescription"
                    name="deckDescription"
                    className="form-control"
                    rows="5"
                    onChange={handleDeckDescription}
                    value={deckDescription}
                    />
                </div>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}