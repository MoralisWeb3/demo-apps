import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import moralis from "moralis";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID)
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL

const App = () => {
  const [user, setUser] = useState(moralis.User.current())
  const onLogin = async () => {
    const user = await moralis.authenticate()
    setUser(user)
  }
  const onLogout = () => {
    moralis.User.logOut()
    setUser(null)
  }
  if (user) {
    return <button onClick={onLogout}>Logout</button>
  }
  return <button onClick={onLogin}>Login</button>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);