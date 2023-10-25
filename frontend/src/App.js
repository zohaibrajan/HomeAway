import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpot'
import SpotDetailsPage from "./components/SpotDetailPage";
import CreateASpot from "./components/CreateASpot";
import UserSpot from "./components/UserSpots";
import EditASpot from "./components/EditASpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path="/">
          <AllSpots />
        </Route>
        <Route exact path="/spots/new">
          <CreateASpot />
        </Route>
        <Route exact path="/spots/current">
          <UserSpot />
        </Route>
        <Route exact path="/spots/:spotId/edit">
          <EditASpot />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetailsPage />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
