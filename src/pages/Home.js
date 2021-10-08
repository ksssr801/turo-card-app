import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Drawer from "@material-ui/core/Drawer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import AddBoxIcon from "@material-ui/icons/AddBox";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import CancelIcon from "@material-ui/icons/Cancel";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
// import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
// import CloseIcon from "@material-ui/icons/Close";
// import FilterListIcon from "@material-ui/icons/FilterList";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import { Bounce, ToastContainer } from "react-toastify";
// import { toast } from "react-toastify";
// import { PeopleAlt, SwapHoriz } from "@material-ui/icons";

class Home extends Component {
  componentDidMount() {
    this.getDashboardData();
  }
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
      loginMessage: "",
      navValue: 0,
      isDashboard: true,
      isCollection: false,
      isRequest: false,
    };
  }

  logoutHandler = () => {
    localStorage.removeItem("token");
  };

  navigationBarHandler = (event, newValue) => {
    this.setState({
      navValue: newValue,
    });
    if (newValue === 0) {
      this.getDashboardData();
      this.setState({
        isDashboard: true,
        isRequest: false,
        isCollection: false,
      });
    }
    if (newValue === 1) {
      this.setState({
        isDashboard: false,
        isRequest: false,
        isCollection: true,
      });
    }
    if (newValue === 2) {
      this.setState({
        isDashboard: false,
        isRequest: true,
        isCollection: false,
      });
    }
  };

  getDashboardData = () => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/home/", {}, { headers })
      .then((res) => {
        console.log("res : ", res)
        if (res.status === 200) {
          this.setState({
            isAuthorized: true,
            loginMessage: "Welcome, " + res.data.username,
          });
        } else {
          this.setState({
            loginMessage: "401 Unauthorized",
          });
        }
      })
      .catch((error) => {
        // console.log("error: ", error.response.data);
      });
  };

  render() {
    return (
      <div className="" style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              Turo Card
            </Typography>
            <br />
            <Button color="inherit" onClick={this.logoutHandler}>
              <Link
                to="/login"
                style={{ textDecoration: "None", color: "#fff" }}
              >
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        <br />
        <Typography
          variant="h5"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          {this.state.loginMessage}
        </Typography>

        <Typography
          variant="subtitle1"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Cards Dashboard
        </Typography>
        <br />
        <div className="p-2">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <Paper elevation={3}>
            <BottomNavigation
              showLabels
              value={this.state.navValue}
              onChange={this.navigationBarHandler}
            >
              <BottomNavigationAction
                className="mr-3 ml-3"
                label="Dashboard"
                icon={<DashboardIcon />}
              />
              <BottomNavigationAction
                className="mr-3 ml-3"
                label="My Collections"
                icon={<ListIcon />}
              />
              <BottomNavigationAction
                className="mr-3 ml-3"
                label="Swap Requests"
                icon={<SwapHorizIcon />}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Home;
