import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import moralisBadge from "../assets/Powered_by_Moralis_Light@4x.png";
import Menu from "./Menu";
import SignUp from "../pages/SignUp";
import AddProperty from "../pages/AddProperty";
import PropertyList from "../pages/PropertyList";
import TransferProperty from "../pages/TransferProperty";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
  },
  badge: {
    height: "2rem",
  },
}));

export default function MainLayout() {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <CssBaseline />
      <Box display="flex">
        <Router>
          <Menu />
          <Container>
            <Typography variant="h4">Africa Land Registry</Typography>
            <img
              className={styles.badge}
              src={moralisBadge}
              alt="Powered by Moralis"
            ></img>

            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/add" component={AddProperty} />
              <Route path="/transfer" component={TransferProperty} />
              <Route exact path="/" component={PropertyList} />
            </Switch>
          </Container>
        </Router>
      </Box>
    </Paper>
  );
}
