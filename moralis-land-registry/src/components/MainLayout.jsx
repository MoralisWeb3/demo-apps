import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moralisBadge from "../assets/Powered_by_Moralis_Light@4x.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
  },
  badge: {
    height: "2rem",
  }
}));

export default function MainLayout() {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <CssBaseline />
        <Container>
          <Typography variant="h2">Africa Land Registry</Typography>
          <img className={styles.badge} src={moralisBadge} alt="Powered by Moralis"></img>
        </Container>
    </Paper>
  );
}
