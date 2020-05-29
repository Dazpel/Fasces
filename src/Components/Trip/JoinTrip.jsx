import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { findMyFriend, updateTripStatus, getTripData } from '../firebase/firebase.utils';

function getModalStyle() {
  //   const top = 50 + rand();
  //   const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function NewTrip({ user }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [join, setJoin] = React.useState(false);
  const [data, setData] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const history = useHistory();

  const lookFriendUp = async (e, email, userID) => {
    e.preventDefault();

    let trip = await findMyFriend(email, userID);

    if (trip === false) {
      alert(
        `There is not an active trip for the user or the user doesn't exist, please try again`
      );
    } else {
      setJoin(true);
      setData(trip);
    }
  };

  const joinTrip = async (userID, tripID) => {

    let x = await getTripData(tripID)
    await updateTripStatus(userID, tripID, x.name, x.date )
    history.push('/')
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">Join Trip</h3>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => lookFriendUp(e, email, user.id)}
      >
        <TextField
          id="outlined-basic"
          label="friend's email"
          variant="outlined"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {join ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
            onClick={() => joinTrip(user.id, data)}
          >
            Join
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
          >
            Search
          </Button>
        )}
      </form>
    </div>
  );

  return (
    <div>
      <Button
        style ={{backgroundColor:'#2769a7', color: "white"}}
        variant="contained"
        color="default"
        size="small"
        // className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpen}
      >
        Join Trip
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
