import React, {useState} from "react"
import {useHistory, useRouteMatch} from "react-router-dom"

import FlipButton from "./flipBtn"
import NextButton from "./nextBtn"
import AddCard from "./addCard"

export default function StudyCards({cards, currentCard, setCurrentCard, Id}) {
    const [cardCount, setCardCount] = useState(1)
    const [isFrontOfCard, setIsFrontOfCard] = useState(true)
    const history = useHistory();
    const {path} = useRouteMatch();

   
    const NextCardHandler = () => {
        if (cardCount < cards.length) {
            setIsFrontOfCard((currentSide) => !currentSide); 
            setCurrentCard(cards[cardCount]) 
            setCardCount((currentCount) => currentCount + 1); 
        } else {
            
            if 
            (window.confirm("Restart cards? Click 'cancel' to return to the home page."))
            {
                
            setIsFrontOfCard((currentSide) => !currentSide)
            setCurrentCard(cards[0]);
            setCardCount(1)
            history.push(path);
            } else {
                
                history.push("/")
            }
        }
    }

    if (cards.length < 3) {
        return (<div>
            <h2>Not enough cards</h2>
            <p>You need at least 3 cards to study. there are {cards.length} cards in this deck.</p>
        <AddCard Id={Id} />
        </div>)
    }

if (isFrontOfCard) {
    return (
        <div>
            <h4>Card {cardCount} of {cards.length}</h4>
            <p>{currentCard.front}</p>
            <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
        </div>
    )
}

return(
    <div>
    <h4>Card {cardCount} of {cards.length}</h4>
    <p>{currentCard.back}</p>
    <FlipButton setIsFrontOfCard={setIsFrontOfCard} />
    <NextButton NextCardHandler={NextCardHandler} />
    </div>
)
}