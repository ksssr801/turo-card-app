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
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
class AddCard extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);

    this.state = {
      cardInfo: {
        card_name: "",
        card_descr: "",
      },
      cardDrawer: false,
      selectedCard: {
        card_css: "",
        default_img:
          "https://lh3.googleusercontent.com/a-/AOh14GhYYpMzvi_km7nzXzE4KY0QZgb5srqKCy-d_gLdmg=s96-c",
      },
      isCardSelected: false,
      presetCards: [
        {
          id: 1,
          card_css: "bg-info",
          default_img:
            "https://lh3.googleusercontent.com/a-/AOh14GhYYpMzvi_km7nzXzE4KY0QZgb5srqKCy-d_gLdmg=s96-c",
          default_name: "Default Name",
          default_descr: "Default Description",
        },
        {
          id: 2,
          card_css: "bg-success",
          default_img:
            "https://lh3.googleusercontent.com/a-/AOh14GhYYpMzvi_km7nzXzE4KY0QZgb5srqKCy-d_gLdmg=s96-c",
          default_name: "Default Name",
          default_descr: "Default Description",
        },
        {
          id: 3,
          card_css: "bg-dark",
          default_img:
            "https://lh3.googleusercontent.com/a-/AOh14GhYYpMzvi_km7nzXzE4KY0QZgb5srqKCy-d_gLdmg=s96-c",
          default_name: "Default Name",
          default_descr: "Default Description",
        },
        {
          id: 4,
          card_css: "bg-danger",
          default_img:
            "https://lh3.googleusercontent.com/a-/AOh14GhYYpMzvi_km7nzXzE4KY0QZgb5srqKCy-d_gLdmg=s96-c",
          default_name: "Default Name",
          default_descr: "Default Description",
        },
      ],
    };
  }

  tempCardInfo = {};
  handleInputChange = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.tempCardInfo[name] = val;
    this.setState({
      cardInfo: this.tempCardInfo,
    });
  };

  toggleCard = (action) => {
    this.setState({
      cardDrawer: action,
    });
  };

  getSelectedCard = (selected) => {
    let ckName = document.getElementsByName("card-select");
    let checkedEl = document.getElementById("card-chkbox-" + selected);
    if (checkedEl.checked) {
      for (let i = 0; i < ckName.length; i++) {
        if (!ckName[i].checked) {
          ckName[i].disabled = true;
        } else {
          ckName[i].disabled = false;
        }
      }
    } else {
      for (let i = 0; i < ckName.length; i++) {
        ckName[i].disabled = false;
      }
    }

    for (let idx in this.state.presetCards) {
      if (this.state.presetCards[idx].id === selected) {
        this.setState({
          selectedCard: this.state.presetCards[idx],
          isCardSelected: true,
        });
        break;
      }
    }
    this.toggleCard(false);
  };

  submitHandler = (event) => {
    console.log(this.state)

    let cardDetails = {
        cardInfo: this.state.cardInfo,
        selectedCard: this.state.selectedCard,
    }
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/add-card/", cardDetails, {
        headers,
      })
      .then((res) => {
        if (res.status === 200) {
          document.getElementById("card-info-form").reset();
          toast.success("Card added successfully!", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          window.location.href = "/home";
        } else {
          toast.error("Error in adding card!", {
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
        console.log("error : ", error);
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
            <Button color="inherit" variant="outlined">
              <Link
                to="/home"
                style={{ textDecoration: "None", color: "#fff" }}
              >
                Dashboard
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
          Add Card
        </Typography>
        <br />
        <div className="p-2">
          <div className="card">
            <div className="card-body">
              {/* <div className="pull-right mb-2"> */}
              <Button
                className="mb-3"
                color="primary"
                variant="outlined"
                onClick={() => this.toggleCard(true)}
              >
                Select Card
              </Button>
              {/* </div> */}
              <br />
              <Drawer
                anchor="bottom"
                open={this.state.cardDrawer}
                onClose={() => this.toggleCard(false)}
              >
                <Button onClick={() => this.toggleCard(false)}>
                  <CloseIcon />
                  &nbsp;Close
                </Button>
                <div className="p-3" style={{ backgroundColor: "#E8E8E8" }}>
                  <Grid sx={{ flexGrow: 1 }} container>
                    <Grid item xs={12}>
                      <Grid justifyContent="center" container spacing={1.5}>
                        {this.state.presetCards.map((value) => (
                          <Grid key={value.id} item>
                            <Paper
                              sx={{ height: 280, width: 210 }}
                              className={"cursor-pointer " + value.card_css}
                            >
                              <div
                                id="cbSelectCard"
                                className="pull-right pr-half pt-half"
                              >
                                <Checkbox
                                  id={"card-chkbox-" + value.id}
                                  name="card-select"
                                  aria-label="Select card"
                                  color="default"
                                  onChange={() =>
                                    this.getSelectedCard(value.id)
                                  }
                                />
                              </div>
                              <div class="card-content-centered">
                                <img src={value.default_img} alt="Avatar" />
                                <div className="h5 mt-1 text-bold text-white">
                                  {value.default_name}
                                </div>
                                <div className="body2 text-white">
                                  {value.default_descr}
                                </div>
                              </div>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Drawer>

              <form id="card-info-form" className="row g-3">
                <div className="col-md-6 mb-3">
                  <InputLabel id="demo-simple-select-label">Name*</InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="card_name"
                    id="inputCardName"
                    defaultValue={this.state.cardInfo.card_name}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter card name"
                    size="small"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <InputLabel id="demo-simple-select-label">
                    Description*
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    name="card_descr"
                    id="inputDescription"
                    defaultValue={this.state.cardInfo.card_descr}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter description"
                    size="small"
                  />
                </div>
                {this.state.isCardSelected && (
                  <div className="col-md-12 mb-3">
                    <InputLabel id="demo-simple-select-label" className="mt-2">
                      Preview
                    </InputLabel>
                    <div className="p-2" style={{ backgroundColor: "#E8E8E8" }}>
                      <Grid justifyContent="center" container spacing={1}>
                        <Grid item>
                          <Paper
                            sx={{ height: 320, width: 250 }}
                            className={this.state.selectedCard.card_css}
                          >
                            <div class="card-content-centered p-1">
                              <img
                                src={this.state.selectedCard.default_img}
                                alt="Avatar"
                              />
                              <div className="h5 mt-1 text-bold text-white">
                                {this.state.cardInfo.card_name ||
                                  "Default Name"}
                              </div>
                              <div className="body2 text-white">
                                {this.state.cardInfo.card_descr ||
                                  "Default Description"}
                              </div>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                )}
                <div className="col-12 mb-3">
                  <Button
                    onClick={this.submitHandler}
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
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

export default AddCard;
