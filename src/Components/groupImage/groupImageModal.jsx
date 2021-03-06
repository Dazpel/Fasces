import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  img: {
    width: 300,
  },
}));

export default function GroupImageModal({ url }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  let downloadUrl = url.replace('image/upload', 'image/upload/fl_attachment');
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <a href={downloadUrl} download>
          <img src={url} alt="groupImage" className={classes.img} />
        </a>
      </div>
    </div>
  );

  return (
    <div>
      <img src={url} alt="groupImg" onClick={handleOpen} style={{ width: '185px',  height: '185px'  }} />
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
