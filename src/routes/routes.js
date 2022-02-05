import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "../componets/login";
import Dashboard from "../componets/dashboard";
import SignUp from "../componets/sign-up"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ SignIn } />
      <Route exact path="/dashboard" component={ Dashboard } />
      <Route exact path="/signup" component={ SignUp } />
      <Route exact path="*" component={() => <h2>A página que vc tento acessar não foi encontrada :( </h2>} />

    </Switch>
  </BrowserRouter>
);

export default Routes;