import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Bounce, ToastContainer } from "react-toastify";

class Login extends Component {
  componentDidMount() {
    this.alreadyLoggedInUser();
  }
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loginInfo: {
        username: "",
        password: "",
      },
      user_validation: "",
      password_validation: ""
  };
  }

  alreadyLoggedInUser = () => {
    if (localStorage.getItem("token")) {
      window.location.href = "/home";
    }
  };

  tempLoginInfo = {};
  handleInputChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.tempLoginInfo[name] = val;
    this.setState({
      loginInfo: this.tempLoginInfo,
    });
  };

  submitHandler = (event) => {
    axios
      .post("http://localhost:9090/api/token/", this.state.loginInfo)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.access);
          window.location.href = "/home";
        } else {
          toast.error("Unauthorized user or error in logging in!", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        this.setState({
          user_validation: error.response.data.username || '',
          password_validation: error.response.data.password || '',
        })
      });
  };

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              Welcome to Turo Card Game!
            </Typography>
            <br />
          </Toolbar>
        </AppBar>
        <br />
        <Typography
          variant="h5"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Please fill in this form to get in.
        </Typography>
        <br />
        <div className="p-2">
          <div className="card">
            <div className="card-body">
              <form id="reg-form" className="row g-3">
                <div className="col-md-12 mb-3">
                  <InputLabel id="demo-simple-select-label">
                    Username*
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    id="inputUsername"
                    defaultValue={this.state.loginInfo.username}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter username"
                    size="small"
                  />
                  { this.state.user_validation && (<i className="text-danger">{this.state.user_validation}</i>) }
                </div>
                <div className="col-md-12 mb-3">
                  <InputLabel id="demo-simple-select-label">
                    Password*
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    id="inputPassword"
                    defaultValue={this.state.loginInfo.password}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter password"
                    type="password"
                    size="small"
                  />
                  { this.state.password_validation && (<i className="text-danger">{this.state.password_validation}</i>) }
                </div>
                <div className="col-12 mb-3">
                  <Button
                    onClick={this.submitHandler}
                    variant="contained"
                    color="primary"
                    size="medium"
                  >
                    Sign In
                  </Button>
                  <span className="ml-3 mr-half">
                    Need an account?
                    <Button color="inherit">
                      <Link
                        to="/"
                        style={{ textDecoration: "None", color: "#3f51b5" }}
                      >
                        Register here
                      </Link>
                    </Button>
                  </span>
                  <ToastContainer
                    position="bottom-right"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    transition={Bounce}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Login;
