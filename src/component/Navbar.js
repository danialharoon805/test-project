import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  let history = useHistory();

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const x = localStorage.getItem("isLogin");
    if (x === '1') {
      setIsLogin(true);
    }
  }, [])

  const handleClick = () => {
    localStorage.setItem("isLogin", 0);
    localStorage.setItem("user", null);
    localStorage.setItem("user_email", null);
    setIsLogin(false);
    history.push("/")
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Hot News
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            {isLogin ?
              (
                <>
                  <Link to="/create-post" className={classes.link}>
                    Create Post
                  </Link>
                  <div className={classes.link} onClick={handleClick}>
                    Sign Out
                  </div>
                </>
              )  : 
              (
                <>
                  <Link to="/sign-up" className={classes.link}>
                    Sign Up
                  </Link>
                  <Link to="/sign-in" className={classes.link}>
                    Sign In
                  </Link>
                </>
              )
            }
            
            
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
