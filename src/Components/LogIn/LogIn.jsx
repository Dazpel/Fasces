import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import './LogIn.css'

import { auth, signInWithGoogle } from '../firebase/firebase.utils';

const useStyles = makeStyles((theme) => ({
  paper: {
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  google: {
    backgroundImage: '../btn_google_signin_light_normal_web.png',
    color: 'white',
  },
  gap: {
    marginTop: 20,
  },
}));

export default function LogIn({ history }) {
  //State Hook

  const authGoogle = async () => {
    try {
      await signInWithGoogle();
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className='gradient'>
     
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon onClick={authGoogle} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </div>
    </Container>
  );
}
