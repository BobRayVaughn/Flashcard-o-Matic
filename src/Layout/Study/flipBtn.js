import React from "react"

export default function FlipButton ({ setIsFrontOfCard }) {
    const flipCardHandler = () => setIsFrontOfCard((currentSide) => !currentSide)
    return(
        <button onClick={flipCardHandler}>Flip</button>
    )
}