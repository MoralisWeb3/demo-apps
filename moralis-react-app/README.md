# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 

Get started 

`npx create-react-app moralis-react-app`

`cd moralis-react-app`

`yarn add moralis`

Add env variables 

```.env
REACT_APP_MORALIS_APPLICATION_ID=YOUR_APP_ID
REACT_APP_MORALIS_SERVER_URL=https://YOUR_MORALIS_SERVER:1337/server
```

Start the app

`yarn start`


```js
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
```