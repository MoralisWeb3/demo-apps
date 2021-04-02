import React, { useEffect, useState } from "react";
import makeBlockie from "ethereum-blockies-base64";
import "./Blockie.css";

export default function Blockie({ address }) {
  const [blockie, setBlockie] = useState("#");

  useEffect(() => {
    const newBlockie = makeBlockie(address);
    setBlockie(newBlockie);
  }, [address]);

  return <img className="u-xs-avatar rounded mr-1" src={blockie} alt={address} />;
}
