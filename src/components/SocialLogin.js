import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

function SocialLogin() {
  const responseSuccessGoogle = (response) => {
    console.log(response);

    try {
      axios.post(
        "http://localhost:4000/googlelogin",
        {
          tokenId: response.tokenId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <h2>Login with social logins</h2>
      <GoogleLogin
        clientId="75044728575-dgg9ak39mi03976k7qv9orq6gl5ng6ji.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default SocialLogin;
