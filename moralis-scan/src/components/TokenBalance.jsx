import React from "react";
import { useTokenBalances } from "../queries/tokenBalance";
import "./TokenBalance.css";

export default function TokenBalance() {
  const { address, tokens, loading } = useTokenBalances();

  if (!address || loading || !tokens) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-start align-items-center">
        <h5>Overview</h5>
      </div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-4 mb-1 mb-md-0">Balance:</div>
          <div className="col-md-8">??? Ether</div>
        </div>
        <hr className="my-3" />
        <div className="row align-items-center">
          <div className="col-md-4 mb-1 mb-md-0">Value:</div>
          <div className="col-md-8">??? (@ ???/ETH)</div>
        </div>
        <hr className="my-3" />
        <div className="row align-items-center">
          <div className="col-md-4 mb-1 mb-md-0">Token:</div>
          <div className="col-md-8">
            <div className="dropdown">
              <button
                className="btn btn-xs btn-custom btn-custom-balance dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {tokens.length} ERC20 Tokens
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {tokens.map((token) => (
                  <li key={token.name}>
                    <button className="dropdown-item" >
                      <div className="d-flex justify-content-between align-itmes-center">
                        <span>{token.name}</span>
                        <span>{token.balanceTxt}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
