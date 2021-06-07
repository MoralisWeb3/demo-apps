import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useRegistryContract } from "../hooks/registryContract";

export default function AddProperty() {
  const [titleFile, setTitleFile] = useState(null);
  const [physAddress, setPhysAddress] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [ownerEthAddress, setOwnerEthAddress] = useState("");
  const { newProperty } = useRegistryContract();

  const onSaveNewProperty = async (e) => {
    e.preventDefault();

    if (!titleFile) {
      alert("Please select a file!");
      return;
    } else if (!physAddress) {
      alert("Please fill in the phsyical address!");
      return;
    }

    try {
      await newProperty({titleFile, physAddress, ownerEthAddress, salePrice});
      alert("Property created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onSubmit={onSaveNewProperty}>
      <Typography variant="h6">Add Property</Typography>
      <form>
        <div>
          <TextField
            required
            id="physical-address"
            label="Physical Address"
            margin="normal"
            fullWidth
            value={physAddress}
            onChange={(e) => setPhysAddress(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            type="number"
            min="0"
            step="0.01"
            id="sale-price"
            label="Sale Price"
            margin="normal"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
          <TextField
            required
            id="owner"
            label="Owner Eth Address"
            margin="normal"
            value={ownerEthAddress}
            onChange={(e) => setOwnerEthAddress(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" component="label">
            {titleFile?.name || "Upload Property Title"}
            <input
              type="file"
              hidden
              onChange={(event) => setTitleFile(event.target.files[0])}
            />
          </Button>
        </div>
        <Box my={1}>
          {titleFile && (
            <Document file={titleFile}>
              <Page pageNumber={1} />
            </Document>
          )}
        </Box>
        <div>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
