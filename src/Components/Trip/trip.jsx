import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Topbar from '../navbar/Topbar';

export default class Trip extends Component {
  render() {

    const goToChat = () => {
        this.props.history.push('/home/chat');
      };
      const goToImage = () => {
        this.props.history.push('/home/image');
      };
      const goToReceipt = () => {
        this.props.history.push('/home/receipt');
      };

    return (
        <div className='tripContainer'>
        <Topbar/>
        <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className='tripContainer-header'
        
      >
          <Typography variant="subtitle1" gutterBottom className=''>
       Welcome, {`{user}`}, click <bold>New trip</bold> if you want to create a new trip with friends, or if you already have a group, click <bold>Join trip</bold>.
      </Typography>
         

      </Grid>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
        className='tripContainer-btns'
        
      >
          
          <Button
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<CreateIcon />}
            // onClick={() => this.handleSubmit(this.state.imageUrl)}
          >
             New trip
          </Button>
          <Button
            variant="contained"
            color="default"
            size="small"
            // className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
            // onClick={() => this.handleSubmit(this.state.imageUrl)}
          >
            Join trip
          </Button>
          


      </Grid>
      </div>
    );
  }
}
