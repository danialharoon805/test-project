import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';

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

const SignUp = () => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, email, password);

    var data = JSON.stringify({"email":email,"password":password,"name":name});

    var config = {
      method: 'post',
      url: 'http://localhost:3010/api/v1/users',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      if (response.data.success) {
        setSuccess(true)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="filled"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
            Signup
          </Button>
        </div>
      </form>
      { success ? <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert onClose={() => {setSuccess(false)}}>success alert — Sign In Now!</Alert>
    </Stack> : ""}
    </>
  );
};

export default SignUp;