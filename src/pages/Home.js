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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Divider } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import AddCommentIcon from "@mui/icons-material/AddComment";

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
      moduleHeading: "Dashboard",
      selectedTab: "allCards",
      anchorEl: null,
      isProfileMenuOpen: false,
      userCards: [],
      commentSection: false,
      commentForCardName: "",
      commentForCardId: undefined,
      card_comment: "",
      commentsList: [],
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

  handleInputChange = (event) => {
    this.setState({
      card_comment: event.target.value,
    });
  };

  toggleCommentSection = (action, card, cardId) => {
    this.setState({
      commentSection: action,
      commentForCardName: card,
      commentForCardId: cardId,
    });
    if (action) this.getCardComments(cardId);
    else this.getDashboardData()
  };

  getCardComments = (cardId) => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9090/dashboard/card-comments/" + cardId + "/", {
        headers,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            commentsList: res.data.commentsList,
          });
        } else {
        }
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
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
        moduleHeading: "Dashboard",
      });
    }
    if (newValue === 1) {
      this.getMyCollection();
      this.setState({
        isDashboard: false,
        isRequest: false,
        isCollection: true,
        moduleHeading: "My Collection",
      });
    }
    if (newValue === 2) {
      this.setState({
        isDashboard: false,
        isRequest: true,
        isCollection: false,
        moduleHeading: "Swap Requests",
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
        }
      })
      .catch((error) => {
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
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
        }
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
      });
  };

  likeCard = (cardId) => {
    let cardObj = {
      cardId: cardId,
    };
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/like-card/", cardObj, { headers })
      .then((res) => {
        if (res.status === 200) {
          this.getDashboardData();
        } else {
        }
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
      });
  };

  dislikeCard = (cardId) => {
    let cardObj = {
      cardId: cardId,
    };
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/dislike-card/", cardObj, {
        headers,
      })
      .then((res) => {
        if (res.status === 200) {
          this.getDashboardData();
        } else {
        }
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
      });
  };

  commentOnCard = (cardId) => {
    console.log("cardId : ", cardId);
    let cardObj = {
      cardId: cardId,
      comment: this.state.card_comment,
    };
    console.log("cardObj : ", cardObj);
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/comment-on-card/", cardObj, {
        headers,
      })
      .then((res) => {
        console.log("res : ", res);
        if (res.status === 200) {
          this.getCardComments(cardId);
          this.setState({
            card_comment: ''
          })
        } else {
        }
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        if (
          error.response.data &&
          error.response.data.code === "token_not_valid"
        ) {
          window.location.href = "/403";
          localStorage.removeItem("token");
        }
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
        <Typography
          variant="subtitle1"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          {this.state.moduleHeading}
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
              {this.state.userCards.length > 0 && (
                <div>
                  {((this.state.isDashboard &&
                    this.state.selectedTab === "allCards") ||
                    this.state.isCollection) && (
                    <div className="col-md-12 mb-3">
                      {this.state.userCards.map((obj) => (
                        <div>
                          <InputLabel
                            id="demo-simple-select-label"
                            className="mt-4"
                          >
                            {this.state.isDashboard
                              ? obj.user + " (" + obj.cards.length + ")"
                              : "My Collection (" + obj.cards.length + ")"}
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
                                      <Card
                                        sx={{ height: 280, width: 210 }}
                                        className={value.extra_params.card_css}
                                      >
                                        <CardContent style={{ height: "29vh", overflowY: "auto" }}>
                                          <div className="card-content-centered p-2">
                                            <div className="img-wrapper">
                                              <img
                                                className="profile-image"
                                                src={
                                                  value.card_image || value.extra_params.default_img
                                                }
                                                alt="Avatar"
                                              />
                                              {!this.state.isCollection && (
                                                <div className="middle">
                                                  <IconButton aria-label="comment">
                                                    <SwapHorizIcon fontSize="large" />
                                                  </IconButton>
                                                </div>
                                              )}
                                            </div>
                                            <div className="h5 mt-1 text-bold text-white">
                                              {value.name}
                                            </div>
                                            <div className="body2 text-white">
                                              {value.description}
                                            </div>
                                          </div>
                                        </CardContent>
                                        {!this.state.isCollection && (
                                          <div>
                                            <Divider />
                                            <CardActions className="bg-light">
                                              <IconButton aria-label="like">
                                                {!value.isLiked && (
                                                  <FavoriteBorderOutlinedIcon
                                                    onClick={() =>
                                                      this.likeCard(
                                                        value.card_id
                                                      )
                                                    }
                                                  />
                                                )}
                                                {value.isLiked && (
                                                  <FavoriteIcon
                                                    color="error"
                                                    onClick={() =>
                                                      this.dislikeCard(
                                                        value.card_id
                                                      )
                                                    }
                                                  />
                                                )}
                                              </IconButton>
                                              <span className="caption">
                                                {value.likes_count}
                                              </span>
                                              <IconButton aria-label="comment">
                                                <ChatBubbleOutlineOutlinedIcon
                                                  onClick={() =>
                                                    this.toggleCommentSection(
                                                      true,
                                                      value.name,
                                                      value.card_id
                                                    )
                                                  }
                                                />
                                              </IconButton>
                                              <Drawer
                                                anchor="bottom"
                                                open={this.state.commentSection}
                                                onClose={() =>
                                                  this.toggleCommentSection(
                                                    false,
                                                    value.name
                                                  )
                                                }
                                              >
                                                <Button
                                                  onClick={() =>
                                                    this.toggleCommentSection(
                                                      false,
                                                      value.name
                                                    )
                                                  }
                                                >
                                                  <CloseIcon />
                                                  &nbsp;Close
                                                </Button>
                                                <div className="p-3">
                                                  <span className="h6">
                                                    <center className="pb-1">
                                                      {
                                                        this.state
                                                          .commentForCardName
                                                      }
                                                    </center>
                                                  </span>
                                                </div>
                                                <form id="card-comment-form">
                                                  <div className="col-md-12 mb-3">
                                                    <TextField
                                                      fullWidth
                                                      multiline
                                                      rows={2}
                                                      rowsMax={4}
                                                      name="card_comment"
                                                      id="inputCardComment"
                                                      defaultValue={
                                                        this.state.card_comment
                                                      }
                                                      variant="outlined"
                                                      onChange={
                                                        this.handleInputChange
                                                      }
                                                      placeholder="Write your comment here..."
                                                      size="small"
                                                    />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                    <Button
                                                      className="mb-2"
                                                      onClick={() =>
                                                        this.commentOnCard(
                                                          this.state
                                                            .commentForCardId
                                                        )
                                                      }
                                                      variant="contained"
                                                      color="primary"
                                                      size="medium"
                                                      startIcon={
                                                        <AddCommentIcon />
                                                      }
                                                    >
                                                      Comment
                                                    </Button>
                                                    <Divider />
                                                  </div>
                                                </form>
                                                <div className="col-12 mb-3">
                                                  {this.state.commentsList.map(
                                                    (val) => (
                                                      <div>
                                                        <div className="mt-2">
                                                          <Typography
                                                            display="inline"
                                                            variant="subtitle2"
                                                            style={{
                                                              flexGrow: 1,
                                                            }}
                                                          >
                                                            <b>{val.user}:</b>
                                                          </Typography>
                                                          &nbsp;
                                                          <Typography
                                                            display="inline"
                                                            variant="body2"
                                                            style={{
                                                              flexGrow: 1,
                                                            }}
                                                          >
                                                            <i>{val.comment}</i>
                                                          </Typography>
                                                        </div>
                                                        <div className="mb-2">
                                                          <Typography
                                                            className="pull-right"
                                                            variant="caption"
                                                            style={{
                                                              flexGrow: 1,
                                                            }}
                                                          >
                                                            {val.timeAgo}
                                                          </Typography>
                                                        </div>
                                                        <Divider />
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </Drawer>
                                              <span className="caption">{value.comments_count}</span>
                                            </CardActions>
                                          </div>
                                        )}
                                      </Card>
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
              )}
              {!this.state.userCards.length && (
                <div className="text-center mt-5">No Data Available</div>
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
