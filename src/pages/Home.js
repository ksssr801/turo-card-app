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
import AddCommentIcon from "@mui/icons-material/AddComment";
import Checkbox from "@mui/material/Checkbox";
import defaultProfile from "../assets/default_profile.jpg";

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
      swapDrawer: false,
      drawerCardName: "",
      drawerCardId: undefined,
      card_comment: "",
      commentsList: [],
      swapCardCollection: [],
      swapCheckList: [],
      selectedCard: {
        card_css: "",
        default_img: defaultProfile,
      },
      isCardSelected: false,
      beepSound:
        "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=",
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
      drawerCardName: card,
      drawerCardId: cardId,
    });
    if (action) this.getCardComments(cardId);
    else this.getDashboardData();
  };

  toggleSwapDrawer = (action, card, cardId) => {
    this.setState({
      swapDrawer: action,
      drawerCardName: card,
      drawerCardId: cardId,
    });
    if (action) this.getMyCollection(true);
    else this.getDashboardData();
  };

  getSelectedCard = (selected) => {
    let tmpSwapList = this.state.swapCheckList;
    if (!tmpSwapList.length) tmpSwapList.push(selected);
    else if (tmpSwapList.includes(selected)) {
      tmpSwapList.splice(tmpSwapList.indexOf(selected), 1);
    } else tmpSwapList.push(selected);

    this.setState({
      swapCheckList: tmpSwapList,
    });

    for (let idx in this.state.swapCardCollection) {
      if (this.state.swapCardCollection[idx].card_id === selected) {
        this.setState({
          selectedCard: this.state.swapCardCollection[idx],
          isCardSelected: true,
        });
        break;
      }
    }
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
      this.getMyCollection(false);
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

  getMyCollection = (isSwap) => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9090/dashboard/my-collection/", { headers })
      .then((res) => {
        if (res.status === 200) {
          if (!isSwap) {
            this.setState({
              isAuthorized: true,
              loginMessage: "Welcome, " + res.data.username,
              currentUser: res.data.username,
              userCards: res.data.myCardCollection,
            });
          } else {
            this.setState({
              swapCardCollection: res.data.myCardCollection[0].cards || [],
            });
            // console.log("res : ", res);
          }
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
            card_comment: "",
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

  playSound = (soundobj) => {
    var thissound = document.getElementById(soundobj);
    thissound.play();
  };

  stopSound = (soundobj) => {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
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
                                      <audio
                                        id="mySound"
                                        src={this.state.beepSound}
                                      />
                                      <div>
                                        <Card
                                          sx={{ height: 280, width: 210 }}
                                          className={
                                            value.extra_params.card_css
                                          }
                                        >
                                          <CardContent
                                            style={
                                              !this.state.isCollection
                                                ? {
                                                    height: "29vh",
                                                    overflowY: "auto",
                                                  }
                                                : {}
                                            }
                                          >
                                            <div className="card-content-centered p-2">
                                              <div className="img-wrapper">
                                                <img
                                                  className="profile-image"
                                                  src={
                                                    value.card_image ||
                                                    value.extra_params
                                                      .default_img
                                                  }
                                                  alt="Avatar"
                                                />
                                              </div>
                                              <div
                                                onMouseOver={() =>
                                                  this.playSound("mySound")
                                                }
                                                onMouseOut={() =>
                                                  this.stopSound("mySound")
                                                }
                                                className="h5 mt-1 text-bold text-white"
                                              >
                                                {value.name ||
                                                  value.extra_params
                                                    .default_name}
                                              </div>
                                              <div className="body2 text-white">
                                                {value.description ||
                                                  value.extra_params
                                                    .default_descr}
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
                                                  open={
                                                    this.state.commentSection
                                                  }
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
                                                            .drawerCardName
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
                                                          this.state
                                                            .card_comment
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
                                                              .drawerCardId
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
                                                              <i>
                                                                {val.comment}
                                                              </i>
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
                                                <span className="caption">
                                                  {value.comments_count}
                                                </span>
                                                <IconButton aria-label="swap cards">
                                                  <SwapHorizIcon
                                                    onClick={() =>
                                                      this.toggleSwapDrawer(
                                                        true,
                                                        value.name,
                                                        value.card_id
                                                      )
                                                    }
                                                  />
                                                </IconButton>
                                                <Drawer
                                                  anchor="bottom"
                                                  open={this.state.swapDrawer}
                                                  onClose={() =>
                                                    this.toggleSwapDrawer(
                                                      false,
                                                      value.name
                                                    )
                                                  }
                                                >
                                                  <Button
                                                    onClick={() =>
                                                      this.toggleSwapDrawer(
                                                        false,
                                                        value.name
                                                      )
                                                    }
                                                  >
                                                    <CloseIcon />
                                                    &nbsp;Close
                                                  </Button>
                                                  <div
                                                    className="p-3"
                                                    style={{
                                                      backgroundColor:
                                                        "#E8E8E8",
                                                    }}
                                                  >
                                                    <span className="h6">
                                                      <center className="pb-2">
                                                        Pick one to swap for the
                                                        card -{" "}
                                                        {
                                                          this.state
                                                            .drawerCardName
                                                        }
                                                      </center>
                                                    </span>
                                                    <Grid
                                                      sx={{ flexGrow: 1 }}
                                                      container
                                                    >
                                                      <Grid item xs={12}>
                                                        <Grid
                                                          justifyContent="center"
                                                          container
                                                          spacing={1.5}
                                                        >
                                                          {this.state.swapCardCollection.map(
                                                            (value) => (
                                                              <Grid
                                                                key={
                                                                  value.card_id
                                                                }
                                                                item
                                                              >
                                                                <Paper
                                                                  sx={{
                                                                    height: 280,
                                                                    width: 210,
                                                                  }}
                                                                  className={
                                                                    "cursor-pointer " +
                                                                    value
                                                                      .extra_params
                                                                      .card_css
                                                                  }
                                                                >
                                                                  <div
                                                                    id="cbSelectCard"
                                                                    className="pull-right pr-half pt-half"
                                                                  >
                                                                    <Checkbox
                                                                      id={
                                                                        "swap-card-chkbox-" +
                                                                        value.card_id
                                                                      }
                                                                      name="swap-card-select"
                                                                      aria-label="Select card"
                                                                      color="default"
                                                                      onChange={() =>
                                                                        this.getSelectedCard(
                                                                          value.card_id
                                                                        )
                                                                      }
                                                                    />
                                                                  </div>
                                                                  <div className="card-content-centered">
                                                                    <img
                                                                      src={
                                                                        value.card_image ||
                                                                        value
                                                                          .extra_params
                                                                          .default_img
                                                                      }
                                                                      alt="Avatar"
                                                                    />
                                                                    <div className="h5 mt-1 text-bold text-white">
                                                                      {
                                                                        value.name ||
                                                                        value.extra_params
                                                                          .default_name
                                                                      }
                                                                    </div>
                                                                    <div className="body2 text-white">
                                                                      {
                                                                        value.description ||
                                                                        value.extra_params
                                                                          .default_descr
                                                                      }
                                                                    </div>
                                                                  </div>
                                                                </Paper>
                                                              </Grid>
                                                            )
                                                          )}
                                                        </Grid>
                                                      </Grid>
                                                    </Grid>
                                                    <center>
                                                      <div className="col-12 mb-3 mt-3">
                                                        {this.state
                                                          .swapCheckList
                                                          .length === 1 && (
                                                          <Button
                                                            // onClick={
                                                            //   this.submitHandler
                                                            // }
                                                            variant="contained"
                                                            color="primary"
                                                            size="medium"
                                                            startIcon={
                                                              <SwapHorizIcon />
                                                            }
                                                          >
                                                            Swap
                                                          </Button>
                                                        )}
                                                        {this.state
                                                          .swapCheckList
                                                          .length !== 1 && (
                                                          <Button
                                                            disabled
                                                            variant="contained"
                                                            color="primary"
                                                            size="medium"
                                                            startIcon={
                                                              <SwapHorizIcon />
                                                            }
                                                          >
                                                            Swap
                                                          </Button>
                                                        )}
                                                      </div>
                                                    </center>
                                                  </div>
                                                </Drawer>
                                              </CardActions>
                                            </div>
                                          )}
                                        </Card>
                                      </div>
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
