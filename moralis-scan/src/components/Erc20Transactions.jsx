import React from "react";
import { useParams } from "react-router";
import Paginator from "./Paginator";
import Erc20TransResults from "./Erc20TransResults";
import { processTokenTransfer } from "../queries/tokenTransfers";

export default function Erc20Transactions() {
  const { address } = useParams();
  if (!address) {
    return null;
  }

  return (
    <div>
      <Paginator
        userAddress={address}
        methodName="getTokenTranfers"
        options={{ postProcess: processTokenTransfer }}
      >
        <Erc20TransResults />
      </Paginator>
    </div>
  );
}
