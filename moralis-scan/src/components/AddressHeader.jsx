import React from "react";
import { useParams } from "react-router";
import Blockie from "./Blockie";
import "./AddressHeader.css";

export default function AddressHeader() {
  const { address } = useParams();
  if (!address) {
    return null;
  }

  return (
    <h4 className="h4">
      <Blockie address={address} />
      {" "}
      <span className="text-address text-secondary">Address {address}</span>
    </h4>
  );
}
