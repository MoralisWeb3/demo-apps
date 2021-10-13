import React from "react";
import ReactDOM from "react-dom";
import { useMoralis } from "react-moralis";

const App = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate({ signingMessage: "Hello World!" })}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default App;
