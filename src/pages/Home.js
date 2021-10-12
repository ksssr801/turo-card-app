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
import Grid from "@mui/material/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@mui/material/Paper";

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
      selectedTab: "allCards",
      anchorEl: null,
      isProfileMenuOpen: false,
      userCards: [],
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
      this.getMyCollection();
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
        // console.log("res : ", res);
        if (res.status === 200) {
          this.setState({
            isAuthorized: true,
            loginMessage: "Welcome, " + res.data.username,
            currentUser: res.data.username,
            userCards: res.data.userCardDetailsList,
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

  getMyCollection = () => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9090/dashboard/my-collection/", { headers })
      .then((res) => {
        // console.log("res : ", res);
        if (res.status === 200) {
          this.setState({
            isAuthorized: true,
            loginMessage: "Welcome, " + res.data.username,
            currentUser: res.data.username,
            userCards: res.data.myCardCollection,
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
            <Button color="inherit" variant="outlined" onClick={this.addCard}>
              <Link
                to="/add-card"
                style={{ textDecoration: "None", color: "#fff" }}
              >
                <AddIcon />
                &nbsp;Card
              </Link>
            </Button>
            <br />
            <Tooltip className="ml-2" title={this.state.currentUser}>
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
          variant="h5"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          {this.state.loginMessage}
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
                    <Tab value="allCards" label="All Cards" />
                    <Tab value="topUsers" label="Top Users" />
                  </Tabs>
                </Box>
              )}
              {((this.state.isDashboard && this.state.selectedTab === 'allCards') || (this.state.isCollection)) && (
                <div className="col-md-12 mb-3">
                  {this.state.userCards.map((obj) => (
                    <div>
                      <InputLabel
                        id="demo-simple-select-label"
                        className="mt-4"
                      >
                        {this.state.isDashboard ? obj.user + " (" + obj.cards.length + ")" : "My Collection (" + obj.cards.length + ")"}
                      </InputLabel>
                      <div
                        className="p-2"
                        style={{ backgroundColor: "#E8E8E8" }}
                      >
                        <Grid sx={{ flexGrow: 1 }} container>
                          <Grid item xs={12}>
                            <Grid container spacing={1.5}>
                              {obj.cards.map((value) => (
                                <Grid key={value.card_id} item>
                                  <Paper
                                    sx={{ height: 280, width: 210 }}
                                    className={
                                      "p-2 " + value.extra_params.card_css
                                    }
                                  >
                                    <div className="card-content-centered">
                                      <img
                                        src={value.extra_params.default_img}
                                        alt="Avatar"
                                      />
                                      <div className="h5 mt-1 text-bold text-white">
                                        {value.name}
                                      </div>
                                      <div className="body2 text-white">
                                        {value.description}
                                      </div>
                                    </div>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
