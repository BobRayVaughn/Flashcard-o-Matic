import React from "react"

export default function Form({cardFront, handleFrontChange, cardBack, handleBackChange}) {
    return (
        <div>
            <div>
            <label htmlFor="cardFront">Front</label>
            <textarea
            id="cardFront"
            name="cardFront"
            className="form-control"
            placeholder="front side of card"
            rows="3"
            onChange={handleFrontChange}
            value={cardFront}
            />
            </div>
            <div>
                <label htmlFor="cardBack">Back</label>
                <textarea
                id="cardBack"
                name="cardBack"
                className="form-control"
                placeholder="Back side of card"
                rows="3"
                onChange={handleBackChange}
                value={cardBack}
                />
            </div>
        </div>
    )
}