import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class Unauthorized extends Component {
  render() {
    return (
      <div className="bg-info" style={{ minHeight: "100vh" }}>
        <div className="container text-center text-white">
          <div className="row">
            <div className="col-10 mx-auto pt-5 text-center">
              <h1 className="display-1 pt-5">403</h1>
              <h1 className="pt-2">Unauthorized access !</h1>
              <span className="h4 pt-1">
                <Button color="inherit" variant="outlined">
                  <Link
                    to="/login"
                    style={{ textDecoration: "None", color: "#fff" }}
                  >
                    Please Login
                  </Link>
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
