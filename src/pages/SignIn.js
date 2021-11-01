import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, password);
    var data = JSON.stringify({"email":email,"password":password});

    var config = {
      method: 'post',
      url: 'http://localhost:3010/api/v1/users/authenticate',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      if (response.data.success) {
        localStorage.setItem("isLogin", 1);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("user_email", response.data.data.email);
        localStorage.setItem("user_name", response.data.data.name);
        history.push('/')

        window.location.reload();

      }
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignIn;