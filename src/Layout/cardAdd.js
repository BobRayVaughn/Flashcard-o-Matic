import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import ErrorMessage from "./errorMessage";

function CardAdd() {
	const { deckId } = useParams();
	const initialState = {
		front: "",
		back: "",
		deckId,
	};
	const [error, setError] = useState(undefined);
	const [currentDeck, setCurrentDeck] = useState({ name: "", description: "" });
	const [formData, setFormData] = useState({ ...initialState }); 
    const abortController = new AbortController(); 
	useEffect(() => {
		async function loadData() {
			try {
				const dataFromAPI = await readDeck(deckId);
				setCurrentDeck(dataFromAPI);
			} catch (error) {
				if (error.name !== "AbortError") {
					console.error(error);
				}
			}
		}
		loadData();
		return () => {
			abortController.abort();
		};
	}, [deckId]);

	const handleChange = ({ target }) => {
		const value = target.value;

		setFormData({
			...formData,
			[target.name]: value,
		});
	};

	const handleReset = (event) => {
		setFormData({ ...initialState });
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		createCard(deckId, formData, abortController.signal)
			.then(handleReset())
			.catch(setError);

		if (error) {
			return <ErrorMessage error={error} />;
		}
		return () => abortController.abort();
	};

	useEffect(() => {
		readDeck(deckId).then(setCurrentDeck);
	}, [deckId]);
	if (currentDeck) {
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="/">Home</a>
						</li>
						<li className="breadcrumb-item" aria-current="page">
							<a href={`/decks/${currentDeck.id}`}>{currentDeck.name}</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Add Card
						</li>
					</ol>
				</nav>
				<h1>{currentDeck.name} Add Card</h1>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="front" className="form-label">
							Front Side
						</label>
						<textarea
							type="textarea"
							className="form-control"
							id="front"
							name="front"
							placeholder="Front Side"
							onChange={handleChange}
							value={formData.front}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description" className="form-label">
							Back Side
						</label>
						<textarea
							type="textarea"
							className="form-control"
							id="back"
							name="back"
							placeholder="Back Side"
							onChange={handleChange}
							value={formData.back}
						/>
					</div>
					<input
						className="btn btn-secondary mr-3"
						type="reset"
						onClick={handleReset}
						value="Reset"
					></input>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
	return "Loading...";
}

export default CardAdd;