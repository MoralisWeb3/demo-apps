import React from "react";

const cols = ["Txn Hash", "Block", "Age", "From", "To", "Value", "Txn Fee"];

export default function TransResults({trans}) {
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

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {cols.map((colName) => (
              <th scope="col" key={colName}>{colName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trans.map((t) => (
            <tr key={t.hash}>
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
