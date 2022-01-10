import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";
import BreadCrumbNavBar from "./bCNB"
import StudyCards from "./studyCards"



function Study() {
    const [deck, setDeck] = useState({});
    const[cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const Id = useParams().deckId
   
    
    useEffect(()=>{ 
        async function loadDeck() {
            const deckData = await readDeck(Id);
            setDeck(deckData)
            setCards(deckData.cards)
            setCurrentCard(deckData.cards[0])
        }
       loadDeck();   
      
    }, [Id])
    if(deck.name){
return (
<div>
    <BreadCrumbNavBar Id={Id} deck={deck} />

    <h1>{deck.name}: Study</h1>

    <StudyCards cards={cards} currentCard={currentCard} setCurrentCard={setCurrentCard} Id={Id} />
</div>
);
    } 
    return "Loading..."
}

export default Study;