import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);

    this.state = {
      registrationInfo: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      user_validation: "",
      password_validation: "",
    };
  }

  tempRegistrationInfo = {};
  handleInputChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.tempRegistrationInfo[name] = val;
    this.setState({
      registrationInfo: this.tempRegistrationInfo,
    });
  };

  submitHandler = (event) => {
    axios
      .post("http://localhost:9090/register", this.state.registrationInfo)
      .then((res) => {
        if (res.status === 200) {
          document.getElementById("reg-form").reset();
          toast.success(
            res.data.username + " has been registered successfully!",
            {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
            }
          );
        } else {
          toast.error(res.data.message, {
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
      <div className="" style={{ flexGrow: 1 }}>
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
          Registration
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Please fill in this form to create an account.
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
                    defaultValue={this.state.registrationInfo.username}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter username"
                    size="small"
                  />
                  {this.state.user_validation && (
                    <i className="text-danger">{this.state.user_validation}</i>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <InputLabel id="demo-simple-select-label">
                    First Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    name="first_name"
                    id="inputFirstName"
                    defaultValue={this.state.registrationInfo.first_name}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter first name"
                    size="small"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <InputLabel id="demo-simple-select-label">
                    Last Name
                  </InputLabel>
                  <TextField
                    fullWidth
                    name="last_name"
                    id="inputLastName"
                    defaultValue={this.state.registrationInfo.last_name}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter last name"
                    size="small"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <InputLabel id="demo-simple-select-label">Email</InputLabel>
                  <TextField
                    fullWidth
                    name="email"
                    id="inputEmail"
                    defaultValue={this.state.registrationInfo.email}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter email"
                    size="small"
                  />
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
                    defaultValue={this.state.registrationInfo.password}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter password"
                    type="password"
                    size="small"
                  />
                  {this.state.password_validation && (
                    <i className="text-danger">
                      {this.state.password_validation}
                    </i>
                  )}
                </div>
                <div className="col-12 mb-3">
                  <Button
                    onClick={this.submitHandler}
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                  >
                    Register
                  </Button>
                  <span className="ml-3 mr-half">
                    Already have an account?
                    <Button color="inherit">
                      <Link
                        to="/login"
                        style={{ textDecoration: "None", color: "#3f51b5" }}
                      >
                        Sign In
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

export default Register;
