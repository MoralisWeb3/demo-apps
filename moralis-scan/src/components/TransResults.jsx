import React from "react";
import { agoTxt, getEllipsisTxt, tokenValueTxt } from "../queries/utils";
import { useResultContext } from "./Paginator";
import "./TransResults.css";

const cols = ["Txn Hash", "Block", "Age", "From", "To", "Value", "Txn Fee"];

const toEth = (wei) => tokenValueTxt(wei, 18, "ETH");

const getTxnFeeTxt = (trans) => {
  return `${Math.round(trans.gas_price / 1e9)} gwei`;
}

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
          {results.map((t) => (
            <tr key={t.hash}>
              <td>{getEllipsisTxt(t.hash)}</td>
              <td>{t.block_number}</td>
              <td>{agoTxt(t.block_timestamp)}</td>
              <td>{getEllipsisTxt(t.from_address)}</td>
              <td>{getEllipsisTxt(t.to_address)}</td>
              <td>{toEth(t.value)}</td>
              <td>{getTxnFeeTxt(t)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
