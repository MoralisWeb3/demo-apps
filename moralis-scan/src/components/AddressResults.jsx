import React from "react";
import TokenBalance from "./TokenBalance";
import Transactions from "./Transactions";

export default function AddressResults() {
  return (
    <div className="py-3">
      <TokenBalance />
      <Transactions />
    </div>
  );
}
