import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createDeck} from "../../utils/api/index"

import CreateDeckNavBar from "./createDeckNB"
import CreateDeckCancelButton from "./createDeckCB"

export default function CreateDeck() {
const [deckName, setDeckName] = useState("")
const [deckDescription, setDeckDescription] = useState("")
const history = useHistory()

const handleDeckNameChange = (event) => setDeckName(event.target.value)
const handleDeckDescriptionChange = (event) => setDeckDescription(event.target.value)

const handleCreateDeckSubmit = (event) => {
    event.preventdefault();
    createDeck({
        name: deckName,
        description: deckDescription,
    }).then((newDeck) => history.push(`/decks/${newDeck.id}`))
};

return (
    <div>
        <CreateDeckNavBar />

        <h1>Create Deck</h1>

        <form onSubmit={handleCreateDeckSubmit}>
            <div className="form-group">
                <label htmlFor="deckName">Name</label>
                <input
                id="deckName"
                type="text"
                name="deckName"
                className="form-control"
                placeholder="Deck Name"
                onChange={handleDeckNameChange}
                value={deckName}
                />
            </div>
            <div className="form-group">
                <label htmlFor="deckDescription">Description</label>
                <textarea
                id="deckDescription"
                name="deckDescription"
                className="form-control"
                placeholder="Brief description of the deck"
                rows="5"
                onChange={handleDeckDescriptionChange}
                value={deckDescription}
                />
            </div>
            <CreateDeckCancelButton />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
)
}