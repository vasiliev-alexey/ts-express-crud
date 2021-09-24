import React from "react";
import { Switch, Route } from "react-router-dom";

import { RootState } from "../store/store";
import { connect } from "react-redux";

import Login from "./Auth/login/Login";
import AdsList from "./ads/AdsList";
import Advertisement from "./ads/Advertisement";
import Register from "./Auth/register/Register";
import withAuthentication from "./utils/requireAuth";

const Routes = ({
  isAuthenticated,
}: ReturnType<typeof mapStateToProps>): React.ReactElement => (
  <Switch>
    <Switch>
      <Route exact path="/" component={AdsList} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/newAd"
        component={withAuthentication(Advertisement, isAuthenticated)}
      />
      <Route
        path="/editAd/:id"
        component={withAuthentication(Advertisement, isAuthenticated)}
      />
    </Switch>
  </Switch>
);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Routes);
