import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

class GoogleSocialAuth extends Component {
  render() {
    const googleResponse = (response) => {
      // console.log("response : ", response);
      if ("accessToken" in response)
        localStorage.setItem("googleAccessToken", response.accessToken);
      // else console.log("response : ", localStorage);
      const googleToken = localStorage.getItem("googleAccessToken");
      // console.log("googleToken : ", googleToken);

      //   const googleLogin = async (accesstoken) => {
      //     let res = await axios.post("http://localhost:9090/rest-auth/google/", {
      //       access_token: accesstoken,
      //     });
      //     console.log(res);
      //     return res.status;
      //   };
      //   let resp = googleLogin(response.accessToken)
      //   console.log("resp : ", resp)
      let headers = { access_token: `${googleToken}` };
      // console.log("headers : ", headers);
      axios
        .post("http://localhost:9090/rest-auth/google/", {
          access_token: googleToken,
        })
        .then((res) => {
          // console.log("res : ", res);
          if ("refresh_token" in res.data)
            localStorage.setItem("token", res.data.refresh_token);

            // if (res.status === 200) {
            //   window.location.href = "/home";
            // } else {
            //   this.setState({
            //     loginMessage: "401 Unauthorized",
            //   });
            // }
        })
        .catch((error) => {
          console.log("error: ", error.response.data);
        });
    };
    return (
      <div className="App">
        <GoogleLogin
          clientId="1009718158054-2suppb5k6l9tr23nljbp5g6al3po4r0r.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
      </div>
    );
  }
}

export default GoogleSocialAuth;
