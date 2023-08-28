import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";
import Households from "./components/Households";
import HouseholdNav from "./components/HouseholdNav";

export default function Routes({ setToken }) {
  return (
    <Switch>
      <Route exact path="/login">
        <Login setToken={setToken} />
      </Route>
      <PrivateRoute exact path="/profile">
        <Profile />
      </PrivateRoute>

      {/* Make private once login works */}
      <Route exact path="/households">
        <Households />
      </Route>
      <Route exact path="/household/:handle/:name">
        <HouseholdNav />
      </Route>
    </Switch>
  );
}
