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

  submitHandler = (event) => {
    const token = localStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    axios
      .post("http://localhost:9090/dashboard/add-card/", this.state.cardInfo, {
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
            <Button color="inherit">
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
          variant="h6"
          className="text-center"
          style={{ flexGrow: 1 }}
        >
          Add Card
        </Typography>
        <br />
        <div className="p-2">
          <div className="card">
            <div className="card-body">
              <span className="pull-right">
                <Button onClick={() => this.toggleCard(true)}>
                  &nbsp;Filter
                </Button>
              </span>
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
                <br />
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
                    name="description"
                    id="inputDescription"
                    defaultValue={this.state.cardInfo.card_descr}
                    variant="outlined"
                    onChange={this.handleInputChange}
                    placeholder="Enter description"
                    size="small"
                  />
                </div>
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
