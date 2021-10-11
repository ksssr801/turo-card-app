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
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";

class Home extends Component {
  componentDidMount() {
    this.getDashboardData();
  }
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false,
      loginMessage: "",
      currentUser: "Please login",
      navValue: 0,
      isDashboard: true,
      isCollection: false,
      isRequest: false,
      selectedTab: "one",
      anchorEl: null,
      isProfileMenuOpen: false,
    };
  }

  logoutHandler = () => {
    this.closePofileMenu();
    localStorage.removeItem("token");
  };

  handleTabSelection = (event, newValue) => {
    this.setState({
      selectedTab: newValue,
    });
  };

  openProfileMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      isProfileMenuOpen: true,
    });
  };

  closePofileMenu = () => {
    this.setState({
      anchorEl: null,
      isProfileMenuOpen: false,
    });
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

  addCard = () => {
    console.log("Add Card...")
  }

  getDashboardData = () => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/home/", {}, { headers })
      .then((res) => {
        console.log("res : ", res);
        if (res.status === 200) {
          this.setState({
            isAuthorized: true,
            loginMessage: "Welcome, " + res.data.username,
            currentUser: res.data.username,
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
            <Button color="inherit" onClick={this.addCard}>
              <Link
                to="/add-card"
                style={{ textDecoration: "None", color: "#fff" }}
              >
                <AddIcon />&nbsp;Card
              </Link>
            </Button>
            <br />
            &nbsp;
            <Tooltip title={this.state.currentUser}>
              <IconButton
                onClick={this.openProfileMenu}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <PersonIcon color="primary" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={this.state.anchorEl}
              open={this.state.isProfileMenuOpen}
              onClose={this.closePofileMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={this.closePofileMenu}>Profile</MenuItem>
              <MenuItem onClick={this.logoutHandler}>
                <Link
                  to="/login"
                  style={{ textDecoration: "None" }}
                  className="text-dark"
                >
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <br />
        <Typography
          variant="h4"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          {this.state.loginMessage}
        </Typography>

        <Typography
          variant="h6"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Cards Dashboard
        </Typography>
        <br />
        <div className="p-2">
          <div className="card">
            <div className="card-body">
              {this.state.isDashboard && (
                <Box sx={{ width: "100%" }} className="text-center">
                  <Tabs
                    value={this.state.selectedTab}
                    onChange={this.handleTabSelection}
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                  >
                    <Tab value="one" label="All Cards" />
                    <Tab value="two" label="Top Users" />
                  </Tabs>
                </Box>
              )}
              <div className="row g-3"></div>
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
