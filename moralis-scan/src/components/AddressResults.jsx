import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useRouteMatch,
  NavLink,
  useParams,
} from "react-router-dom";
import TokenBalance from "./TokenBalance";
import Transactions from "./Transactions";
import AddressHeader from "./AddressHeader";
import "./AddressResults.css";

export default function AddressResults() {
  const { address } = useParams();

  return (
    <div className="py-3">
      <AddressHeader />
      <TokenBalance />
      <Router>
        <div className="card">
          <div className="card-header">
            <ul className="nav mb-1">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to={`/address/${address}/main`}
                >
                  Transactions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to={`/address/${address}/erc20`}
                >
                  ERC20 Token Txns
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <Switch>
              <Route
                exact
                path="/address/:address/:transType"
                component={Transactions}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
