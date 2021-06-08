import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "./Menu";
import Header from "./Header";
import SignUp from "../pages/SignUp";
import AddProperty from "../pages/AddProperty";
import PropertyList from "../pages/PropertyList";
import TransferProperty from "../pages/TransferProperty";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
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
            <Header />
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
