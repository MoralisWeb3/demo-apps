import React from "react";
import { useParams } from "react-router";
import { fetchTransactions } from "../queries/transactions";
import Paginator from "./Paginator";
import TransResults from "./TransResults";

export default function Transactions() {
  const { address } = useParams();
  if (!address) {
    return null;
  }

  return (
    <div>
      <Paginator fetchPage={fetchTransactions} fetchArgs={{ address }}>
        <TransResults address={address} />
      </Paginator>
    </div>
  );
}
