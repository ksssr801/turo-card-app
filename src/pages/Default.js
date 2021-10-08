import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Default extends Component {
  render() {
    return (
      <div className="bg-primary" style={{ minHeight: "100vh" }}>
        <div className="container text-center text-white">
          <div className="row">
            <div className="col-10 mx-auto pt-5 text-center">
              <h1 className="display-1 pt-5">404</h1>
              <h1 className="pt-2">Page not found !</h1>
              <span className="h4 pt-1">
                The requested url{" "}
                <span className="text-danger">
                  {this.props.location.pathname}
                </span>{" "}
                not found.
              </span>
              <br />
              <span className="pt-1">
                <Link to="/" style={{ color: "#fff" }}>
                  <span className="h4">Go to home</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
