import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import LoginButton from "./UI/LoginButton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-v3w16l8vqobtvsu3.eu.auth0.com"
    clientId="TQwJyhjLPA1tGSuvr9AImJ1WkDBv0Op5"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
