import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import './PastTrips.css'


class ContactUs extends Component {
    state = {
        creators: [
            {
                name: 'Billy Zedan',
                img: '/Billy.jpeg',
                description: 'Front-End Developer - Javascript, React, HTML, CSS, C and C++',
                email: 'billyzedan123@gmail.com',
                linkedIn: 'https://www.linkedin.com/in/billy-zedan/'
            },
            {
                name: 'Hugo Suarez',
                img: '/HugoProfilePic.jpeg',
                description: 'Software Developer - JavaScript, React.js, Express.js, Node.js​, ​MongoDB',
                email: 'hugo.suarez92@yahoo.com',
                linkedIn: 'https://www.linkedin.com/in/hugosuarezjr/'
            },
            {
                name: 'Alexander Victoria',
                img: '/Alex.jpeg',
                description: 'Software Developer - JavaScript, React.js, Express.js, Node.js​, ​MongoDB',
                email: 'alexxdav97@gmail.com',
                linkedIn: 'https://www.linkedin.com/in/dazpel/'
            }
        ]
    }
    showContacts = () => {
        return this.state.creators.map((creator) => {
          return (
            
            <>
            <br/>
              <Paper className='paper' style={{backgroundColor: '#white', maxWidth: 300}}>
                <Grid container spacing={2}>
                  <Grid item>
                      <Link to='/TripImage'><img style={{width: '100vw', borderRadius: '50%'}} className='img' alt="complex" src={creator.img} /></Link>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      
                        <Typography gutterBottom variant="subtitle1">
                          <h2>{creator.name}</h2>
                        </Typography>
                        <Typography color="textSecondary">
                          {creator.description}
                        </Typography>
                        <Typography>
                            <h3>LinkedIn:</h3> <a href={creator.linkedIn} style={{textDecoration: 'none'}}>{creator.linkedIn}</a>
                        </Typography>
                        <Typography>
                            <h3>Email:</h3>
                        </Typography>
                        <Typography>
                            {creator.email}
                        </Typography>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </>
            
          )
        })
      }
    render() {
        return (
            <>
            <div style={{textAlign: 'center', textDecoration: 'underline'}}>
                <h1>The Creators</h1>
            </div>
            <div className='base' style={{textAlign: 'center', overflow: 'scroll', height: '74vh'}} >
          {this.showContacts()}
          </div>
            </>
        );
    }
}

export default ContactUs;