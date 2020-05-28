import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { singleQuery } from '../firebase/firebase.utils';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const updateUser = async (uID, tripID) => {
  await singleQuery(uID, tripID);
};

function goToTrip(props, uID, tripID, option) {

  updateUser(uID, tripID);

    switch (option) {
      case 1:
        props.history.push('/home/image');
        break;
      case 2:
        props.history.push('/home/receipt');
        break;

      default:
        break;
    }
}

export default function SimpleList({ arr, userID, props }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Your past trips
        </ListSubheader>
      }
      className={classes.root}
    >
      {arr.map((el, i) => {
        return (
          <>
            <ListItem button onClick={handleClick}>
              <ListItemText primary={`${el.name}      -${el.date}`} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={()=> goToTrip(props, userID, el.id, 1 )}>
                  <ListItemText primary="Pictures" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={()=> goToTrip(props, userID, el.id, 2 )}>
                  <ListItemText primary="Receipts" />
                </ListItem>
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
}
