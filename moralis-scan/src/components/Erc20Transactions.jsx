import React from 'react'
import { useParams } from "react-router";
import Paginator from './Paginator'
import Erc20TransResults from "./Erc20TransResults";
import { fetchTokenTransfers } from '../queries/tokenTransfers';

export default function Erc20Transactions() {
  const { address } = useParams();
  if (!address) {
    return null;
  }

  return (
    <div>
      <Paginator fetchPage={fetchTokenTransfers} fetchArgs={{ address }}>
        <Erc20TransResults />
      </Paginator>
    </div>
  )
}
