import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import Topbar from '../navbar/Topbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chat from '../Chat/Chat'

class NewHome extends Component {
<<<<<<< HEAD
    render() {
        console.log(this.props.currentUser)
        return (
            <div class='App'>
                NEW HOME, RENDER CHAT AND ALL THAT
                <br/>
                <button style={{backgroundColor:'lightgreen'}}>Join Group</button>
                <br/>
                <button style={{backgroundColor:'lightblue'}}>Create Group</button>
            </div>
        );
    }
=======
  render() {
    return (
      <div>
        <Topbar />
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="subtitle1" gutterBottom className="">
            we render chat here
          </Typography>
          <Chat />
        </Grid>
        <Navbar />
      </div>
    );
  }
>>>>>>> 9e1ad18af46269b543b3302ac8238643b93801e5
}

export default NewHome;
