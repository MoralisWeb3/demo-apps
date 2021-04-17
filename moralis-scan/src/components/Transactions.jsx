import React from "react";
import { useParams } from "react-router";
import { useTransType } from "../hooks/useTransType";
import Paginator from "./Paginator";
import TransResults from "./TransResults";

export default function Transactions() {
  const { address } = useParams();
  const { methodName, postProcess, itemName } = useTransType();
  if (!address) {
    return null;
  }

  return (
    <div>
      <Paginator
        userAddress={address}
        methodName={methodName}
        options={{ postProcess }}
        itemName={itemName}
      >
        <TransResults  />
      </Paginator>
    </div>
  );
}
