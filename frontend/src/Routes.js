import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import Households from "./components/Households";
import HouseholdNav from "./components/HouseholdNav";
import DownloadView from "./components/DownloadView";

export default function Routes({ setToken }) {
  return (
    <Switch>
      <Route exact path="/login">
        <Login setToken={setToken} />
      </Route>
      {/* <PrivateRoute exact path="/profile">
        <Profile />
      </PrivateRoute> */}
      <PrivateRoute exact path="/households">
        <Households />
      </PrivateRoute>
      <PrivateRoute exact path="/household/:handle/:name">
        <HouseholdNav />
      </PrivateRoute>
      <PrivateRoute exact path="/downloadView/:householdId">
        <DownloadView />
      </PrivateRoute>
    </Switch>
  );
}
