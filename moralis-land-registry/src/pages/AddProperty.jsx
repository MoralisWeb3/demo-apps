import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export default function AddProperty() {
  const [titleFile, setTitleFile] = useState();
  const [physAddress, setPhysAddress] = useState("");
  const [salePrice, setSalePrice] = useState();
  const [ownerEthAddress, setOwnerEthAddress] = useState();

  const onSaveNewProperty = (e) => {
    e.preventDefault();
  };

  return (
    <div onSubmit={onSaveNewProperty}>
      <Typography variant="h6">Add Property</Typography>
      <form noValidate>
        <div>
          <TextField
            required
            id="physical-address"
            label="Physical Address"
            margin="normal"
            fullWidth
            value={physAddress}
            onChange={(e) => setPhysAddress(e.target.files)}
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
          <Button type="submit" variant="contained" color="primary">Save</Button>
        </div>
      </form>
    </div>
  );
}
