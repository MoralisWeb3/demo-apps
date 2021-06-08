import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import moralisBadge from "../assets/Powered_by_Moralis_Light@4x.png";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  badge: {
    height: "2rem",
    marginLeft: "auto",
  },
}));

export default function Header() {
  const styles = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={styles.title} variant="h4">
          Africa Land Registry
        </Typography>
        <img
          className={styles.badge}
          src={moralisBadge}
          alt="Powered by Moralis"
        ></img>
      </Toolbar>
    </AppBar>
  );
}
