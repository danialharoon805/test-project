import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
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

const CreatePost = () => {
  const classes = useStyles();
  // create state variables for each input
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(heading, description);
    const user = localStorage.getItem("user_email")
    var data = JSON.stringify({"email":user,"heading":heading,"description":description});

    var config = {
      method: 'post',
      url: 'http://localhost:3010/api/v1/news-post',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.success) {
        history.push("/");
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
        label="Heading"
        type="text"
        required
        value={heading}
        onChange={e => setHeading(e.target.value)}
      />
      <TextField
        label="Description"
        type="text"
        required
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;