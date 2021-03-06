import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './PastTrips.css';
import { singleQuery, getTripBalance } from '../firebase/firebase.utils';

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
  margin: {
    marginRight: '15px',
  },
}));

const updateUser = async (uID, tripID) => {
  await singleQuery(uID, tripID);
};

const getBalance = async (tripID, name, setBalance) => {
  let x = await getTripBalance(tripID);
  let balance = '';
  x.map((el) => {
    if (el.name === name) {
      setBalance(el.balance);
    }
  });
};

function goToTrip(props, uID, tripID, option) {
  updateUser(uID, tripID);

  switch (option) {
    case 1:
      props.history.push('/pastTrip/receipt');
      break;
    case 2:
      props.history.push('/pastTrip/image');
      break;
    case 3:
      props.history.push('/pastTrip/expenses')
      break;
    default:
      break;
  }
}

export default function SimpleList({ arr, userID, props }) {
  const classes = useStyles();
  const [balance, setBalance] = React.useState(0);

  let image = [
    'https://www.exoticca.travel/blog/wp-content/uploads/2018/09/bigstock-Happy-Man-Traveler-Jumping-Wit-239063806-800x360.jpg',
    'https://thetravelexpert.ie/wp-content/uploads/2019/05/shutterstock_358226087-compressor.jpg',
    'https://qtxasset.com/styles/breakpoint_l_640px_w/s3/2017-06/roadtripgetty.jpg?sREdvaCPJPe1s1R6oIpEh97tfhL9kSfO&itok=lC0DkMY5',
  ];

  return (
    <>
      <div style={{ overflow: 'scroll', height: '85vh' }}>
        <div className="base" style={{ textAlign: 'center' }}>
          {arr.map((el, i) => {
            // getBalance(el.id, props.currentUser.displayName, setBalance)
            return (
              <Paper
                className="paper"
                style={{ backgroundColor: 'aliceblue', maxWidth: 300 }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <img
                      style={{ width: '100vw' }}
                      className="img"
                      alt="complex"
                      src={image[i]}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {el.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {el.date}
                        </Typography>
                        <Typography variant="subtitle1">
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <div
                              style={{
                                marginRight: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              {balance > 0
                                ? `What you owe: 0`
                                : `What you owe: ${balance}`}
                            </div>
                            <div
                              style={{
                                marginRight: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              <button className="moneyButton">PAY $</button>
                            </div>
                          </div>
                        </Typography>
                        <Grid container justify="center" alignItems="center">
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.margin}
                            onClick={() => {
                              goToTrip(props, userID, el.id, 1);
                            }}
                          >
                            receipts
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.margin}
                            onClick={() => {
                              goToTrip(props, userID, el.id, 2);
                            }}
                          >
                            images
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            className={classes.margin}
                            onClick={() => {
                              goToTrip(props, userID, el.id, 3);
                            }}
                          >
                            expenses
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </div>
      </div>
      {/* <ListItem button onClick={handleClick}>
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
            </Collapse> */}
    </>
  );
}
