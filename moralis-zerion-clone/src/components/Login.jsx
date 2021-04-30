import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../utils";


export default function Login() {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" p={1}>
        <Button color="primary" variant="contained" onClick={() => authenticate()}>
          Connect
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" p={1}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          console.log("logging out...");
          logout();
        }}
      >
        {getEllipsisTxt(user.attributes.ethAddress)}
        <CloseIcon fontSize="small"/>
      </Button>
    </Box>
  );
}
