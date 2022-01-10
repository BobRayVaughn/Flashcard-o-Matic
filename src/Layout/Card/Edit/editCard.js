import React, {useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom"
import {readDeck, readCard, updateCard} from "../../../utils/api/index"

import EditCardNavBar from "./editCardNB"
import CardForm from "../cardForm"

export default function EditCard() {
    const [deck, setDeck] = useState({});
    const [preExistingCard, setPreExistingCard] = useState({})
    const [cardFront, setCardFront] = useState("")
    const [cardBack, setCardBack] = useState("")

    const deckId = useParams().deckId;
    const cardId = useParams().cardId;
    const history = useHistory();

    //pulls api data, and sets into different states.
    useEffect(() =>{
        async function loadDeck() {
            const deckData = await readDeck(deckId)
            setDeck(deckData)
        }
        async function loadCard(){
            const cardData = await readCard(cardId)
            setPreExistingCard(cardData)
            setCardFront(cardData.front)
            setCardBack(cardData.back)
        }
        loadDeck();
        loadCard();
    }, [deckId, cardId]);

    const handleFrontChange = (event) => setCardFront(event.target.value)
    const handleBackChange = (event) => setCardBack(event.target.value)

    const handleEditCardSubmit = (event) => {
        event.preventDefault();
        updateCard({...preExistingCard, front: cardFront, back: cardBack })
        .then((updatedCard) => history.push(`/decks/${updatedCard.deckId}`))
    };

    return(
        <div>
            <EditCardNavBar 
            deckName={deck.name}
            Id={deckId}
            cardId={cardId}
            />

            <h1>Edit Card</h1>
            
            <form onSubmit={handleEditCardSubmit}>
                <CardForm cardFront={cardFront}
                handleFrontChange={handleFrontChange}
                cardBack={cardBack}
                handleBackChange={handleBackChange}
                />
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
            </form>
        </div>
    )
}