import React from "react";
import Header from "./Header";
import Home from "./Home";
import Study from "./Study";
import CreateDeck from "./deckCreate";
import Deck from "./Deck";
import EditDeck from "./deckEdit";
import CardAdd from "./cardAdd";
import EditCard from "./cardEdit";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import "../App.css";

function Layout() {
	return (
		<div>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/decks/new">
						<CreateDeck />
					</Route>
					<Route path="/decks/:deckId/edit">
						<EditDeck />
					</Route>
					<Route path="/decks/:deckId/study">
						<Study />
					</Route>
					<Route path="/decks/:deckId/cards/new">
						<CardAdd />
					</Route>
					<Route path="/decks/:deckId/cards/:cardId/edit">
						<EditCard />
					</Route>
					<Route path="/decks/:deckId">
						<Deck />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Layout;