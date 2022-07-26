import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Common/Header";
import NotFound from "./Common/NotFound";
import Home from "./Home/Home";
import StudyPage from "./Deck/StudyPage";
import CreateDeck from "./Home/CreateDeck";
import EditDeck from "./Deck/EditDeck";
import Deck from "./Deck/Deck";
import EditCard from "./Cards/EditCard";
import AddCard from "./Cards/AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path={"/"}>
            <Home />
          </Route>

          <Route path={"/decks/:deckId/study"}>
            <StudyPage />
          </Route>

          <Route path={"/decks/new"}>
            <CreateDeck />
          </Route>

          <Route path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>

          <Route path={"/decks/:deckId/"} exact={true}>
            <Deck />
          </Route>

          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>

          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
