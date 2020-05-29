import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import GoogleButton from 'react-google-button';
import './LogIn.css';

import { signInWithGoogle } from '../firebase/firebase.utils';

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
  title: {
    color: '#fff',
    letterSpacing: '4.5px',
    textShadow: '2px 2px 10px #7d7a7a',
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
    <Grid container justify="center" alignItems="center" className="gradient">
      <div>
        <Typography variant="h2" className={classes.title} gutterBottom>
          Splitex
        </Typography>
      </div>
      <div>
        <GoogleButton onClick={authGoogle} />
      </div>
    </Grid>
  );
}
