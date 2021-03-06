import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ToastMessage({message}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
      console.log('closing')
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );


//   if(val!==false){
    
//     return (
//         <div className={classes.root}>
//           <Snackbar open={true} autoHideDuration={6000} onClose={ToastMessage(decoy)}>
//             <Alert onClose={handleClose} severity="success">
//               Image uploaded successfully!
//             </Alert>
//           </Snackbar>
//           {/* <Alert severity="error">This is an error message!</Alert>
//           <Alert severity="warning">This is a warning message!</Alert>
//           <Alert severity="info">This is an information message!</Alert>
//           <Alert severity="success">This is a success message!</Alert> */}
//         </div>
//       );
//   }else {
//       return ''
//   }

  
}