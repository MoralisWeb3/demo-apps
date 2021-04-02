import React from "react";
import { agoTxt, getEllipsisTxt } from "../queries/utils";
import { useResultContext } from "./Paginator";

import "./TransResults.css";

const cols = ["Txn Hash", "Age", "From", "To", "Value", "Token"];

export default function TransResults() {
  const { results } = useResultContext();
  if (!results) {
    return null;
  }

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {cols.map((colName) => (
              <th scope="col" key={colName}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((t, i) => (
            <tr key={i}>
              <td>{getEllipsisTxt(t.transaction_hash)}</td>
              <td>{agoTxt(t.block_timestamp)}</td>
              <td>{getEllipsisTxt(t.from_address)}</td>
              <td>{getEllipsisTxt(t.to_address)}</td>
              <td>{t.value}</td>
              <td>{t.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
