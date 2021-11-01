import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Signin from "./pages/SignIn";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={Signin} />
        <Route path="/create-post" component={CreatePost} />
      </Switch>
    </Router>
  );
}
export default App;