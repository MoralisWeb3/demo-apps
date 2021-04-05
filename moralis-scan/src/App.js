import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import moralis from "moralis";
import AddressResults from "./components/AddressResults";
import Home from "./components/Home";
import Header from "./components/Header";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route path="/address/:address" component={AddressResults} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
