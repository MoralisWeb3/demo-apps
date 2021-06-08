import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";
import { REGISTRY_ADDRESS } from "../hooks/registryContract";
import Property from "../components/Property";

const initialState = [];

export default function PropertyList() {
  const { data } = useMoralisQuery(
    "EthNFTOwners",
    (query) =>
      query
        .equalTo("symbol", "LAND")
        .equalTo("token_address", REGISTRY_ADDRESS.toLowerCase()),
    [],
    { live: true }
  );
  const [properties, setProperties] = useState(initialState);

  useEffect(() => {
    if (data) {
      const list = data.map((p) => p.attributes.token_uri);
      setProperties(list);
    }
  }, [data]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Property List</Typography>
      <Grid container spacing={1}>
        {properties.map((property, i) => (
          <Grid key={i} item xs={12}>
            <Property ifpsPath={property} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
