//Internal imports
import "./App.css";
import "./bootstrap.min.css";
import "./common.css";

//Library imports
import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Default from "./pages/Default";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import Unauthorized from "./pages/Unauthorized";

export default class App extends Component {
  render() {
    return (
        <div>
          <React.Fragment>
            <BrowserRouter>
              {/* <NavBar /> */}
              <Switch>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/add-card" component={AddCard} />
                <Route path="/403" component={Unauthorized} />
                <Route component={Default} />
              </Switch>
            </BrowserRouter>
            {/* <InfoFooterBar />
            <FooterBar /> */}
          </React.Fragment>
        </div>
    );
  }
}
