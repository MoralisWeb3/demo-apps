import React from "react";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";

import Login from "./Login";
import ListItemLink from "./ListItemLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Menu() {
  const classes = useStyles();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Login />
        <Divider />
        <List>
          <ListItemLink to="/" primary="Properties" icon={<LocationOnIcon />} />
          <ListItemLink to="/add" primary="New Property" icon={<AddCircleIcon />} />
          <ListItemLink to="/transfer" primary="Transfer" icon={<SwapHorizontalCircleIcon />} />
        </List>
      </Drawer>
    </div>
  );
}
