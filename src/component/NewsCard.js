import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function NewsCard(props) {

  const handleClick = () => {
    ;(async () => {

      let user = localStorage.getItem('user_email');

      if (user === 'null')
        user = null;

      const uniqueId = user || localStorage.getItem('unique_user_id');
     
      var data = JSON.stringify({"post_id":props.id,"unique_user_id":uniqueId});

      var config = {
        method: 'post',
        url: 'http://localhost:3010/api/v1/news-post/add-like',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(response.data);
        props.onChange()
      })
      .catch(function (error) {
        console.log(error);
      });

    })()
  }

  const handleDivClick = () => {
    console.log("xxx", props.id);
    ;(async () => {

      const user = localStorage.getItem('user_email');

      const uniqueId = user || localStorage.getItem('unique_user_id');
     
      var data = JSON.stringify({"post_id":props.id,"unique_user_id":uniqueId});

      var config = {
        method: 'post',
        url: 'http://localhost:3010/api/v1/news-post/add-view',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(response.data.data.views);
        props.onChange()
      })
      .catch(function (error) {
        console.log(error);
      });

    })()
  }

  return (
    <Card sx={{ minWidth: 275 }} onClick = {handleDivClick}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.user.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.heading}
        </Typography>
        <Typography variant="body2">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick = {handleClick}>Like {props.likes}</Button>
        <p style={{marginLeft: '10px'}}>Views {props.views}</p>
      </CardActions>
    </Card>
  );
}