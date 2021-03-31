import React from "react";
import { useResultContext } from "./Paginator";
import "./TransResults.css";

const cols = ["#", "Txn Hash", "Block", "Age", "From", "To", "Value", "Txn Fee"];

export default function TransResults() {
  const { results } = useResultContext();
  const getTxnFeeTxt = (trans) => {
    return `${Math.round(trans.gas_price / 1e9)} gwei`;
  }

  const toEth = (wei) => {
    return `${wei / 1e18} ETH`;
  }

  const getEllipsisTxt = (hash, n = 6) => {
    return `${hash.substr(0, n)}...${hash.substr(
      hash.length - n,
      hash.length
    )}`;
  }

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
              <td>{t.index}</td>
              <td>{getEllipsisTxt(t.hash)}</td>
              <td>{t.block_number}</td>
              <td>{t.block_timestamp}</td>
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
