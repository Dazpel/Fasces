import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createNewTrip } from '../firebase/firebase.utils';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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

export default function NewTrip({user}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const generateID = () => {
    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaaaaaa'
        return  s4() + s4() + s4();
    }

    return guid()
  }
  const history = useHistory();

  const saveTripName = async (e, name)=>{
    
      e.preventDefault()
     
      let id = await generateID()
     await createNewTrip(user, name, id)
     history.push('/newhome')


  }


  const body = (
    <div style={modalStyle} className={classes.paper} >
      <h3 id="simple-modal-title">New Trip</h3>
      <form  noValidate autoComplete="off" onSubmit={(e)=>saveTripName(e, name)} >
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e)=> {handleChange(e)}} />
      <Button
      type='submit'
            variant="contained"
            color="primary"
            size="small"
            // className={classes.button}
            >
            Save
          </Button>
    </form>
      
      
    </div>
  );

  return (
    <div>
         <Button
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<CreateIcon />}
            onClick={handleOpen}>
          
            New trip
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