import React, { useState, useEffect } from "react";
import {
    Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(()=>({
    link:{
        textDecoration:"none",
        color: "blue",
        fontSize: "20px",
    },
    icon:{
        color: "white"
    }
}));

function DrawerComponent() {
    const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const x = localStorage.getItem("isLogin");
    if (x === '1') {
      setIsLogin(true);
    }
  }, [])
  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
        <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>Home</Link>
            </ListItemText>
          </ListItem>
          <Divider/>
          {isLogin ? (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/create-post" className={classes.link}>Create Post</Link>
              </ListItemText>
            </ListItem>
            )
          :(
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/sign-up" className={classes.link}>Sign Up</Link>
                </ListItemText>
              </ListItem>
              <Divider/>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link to="/sign-in" className={classes.link}>Sign In</Link>
                </ListItemText>
              </ListItem>
            </>
          )}
          
          
          <Divider/>
          
          <Divider/>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
