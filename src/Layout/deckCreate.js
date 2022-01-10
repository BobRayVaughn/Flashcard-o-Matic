import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"; 
import { createDeck } from "../utils/api";
import ErrorMessage from "./errorMessage";

function CreateDeck() {
	const initialFormState = {
		name: "",
		description: "",
	}; 
	const [formData, setFormData] = useState({ ...initialFormState }); 
	const history = useHistory();
	const [error, setError] = useState(undefined);

	const handleCancel = (event) => {
		history.push("/");
	};

	const handleChange = ({ target }) => {
		const value = target.value; 

		setFormData({
			...formData, 
			[target.name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const abortController = new AbortController();

		createDeck(formData, abortController.signal)
			.then((data) => setFormData(data))
			.catch(setError);

		return () => abortController.abort();
	};
	useEffect(() => {
		if (formData.id) {
			history.push(`/decks/${formData.id}`);
		}
	}, [formData]);
	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (formData)
		return (
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to="/">Home</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Create Deck
						</li>
					</ol>
				</nav>
				<h1>Create Deck</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">
							Name
							<input
								className="form-control"
								type="text"
								id="name"
								name="name"
								onChange={handleChange}
								value={formData.name}
								placeholder="Deck Name"
							/>
						</label>
					</div>
					<div className="form-group">
						<label htmlFor="textArea">
							Description
							<textarea
								className="form-control"
								type="text"
								id="textArea"
								onChange={handleChange}
								value={formData.description}
								rows="7"
								placeholder="Brief description of the deck"
							></textarea>
						</label>
					</div>
				</form>
				<Link to="/">
					<button type="cancel" className="btn btn-secondary" onClick={handleCancel}>
						Cancel
					</button>
				</Link>
				<Link to="/decks/deckId">
					<button type="submit" className="btn btn-danger">
						Submit
					</button>
				</Link>
			</div>
		);
}

export default CreateDeck;