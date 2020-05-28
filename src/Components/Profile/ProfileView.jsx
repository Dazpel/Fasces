import React, { Component } from 'react';
import { auth } from '../firebase/firebase.utils';
import { updateQuote, updateProfileStatus } from '../firebase/firebase.utils'
import EditIcon from '@material-ui/icons/Edit';


class ProfileView extends Component {
  state = {
    userID: this.props.currentUser.id,
    findQuote: this.props.currentUser.quote,
    quote: ''
  };

  // componentDidMount(){
  //   this.props.currentUser.quote ? this.setState({
  //     quote: true
  //   }) : this.setState({
  //     quote: false
  //   })
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
 
    updateQuote(this.state.userID, this.state.quote);
    
  };

  onEdit = (e) => {
    e.preventDefault();

    updateQuote(this.state.userID, '')
  }

  render() {
    const logOut = () => {
      auth.signOut();
      this.props.history.push("/");
    };

    return (
      <div>
        <br />
        <div className="App">
          <img
            src={this.props.currentUser.photoURL}
            alt={this.props.currentUser.displayName}
            style={{ width: "50vw", borderRadius: "50%" }}
          />
          <h1 style={{ fontFamily: "comic sans ms, cursive, sans-serif" }}>
            {this.props.currentUser.displayName}
          </h1>
          <hr style={{borderColor: 'black'}}/>
          <h3 style={{ marginLeft: "5px", marginRight: "5px" }}>
            Email: {this.props.currentUser.email}
          </h3>
          {this.state.findQuote ? (
            <>
            <p style={{fontStyle: 'italic', marginBottom:'5px'}}>"{this.props.currentUser.quote}"</p>
            <button style={{height: '18px', borderRadius: '50%', backgroundColor: 'white'}} onClick={e => this.onEdit(e)}><EditIcon style={{fontSize: 'small'}}/></button>
            <br/>
           </>
          ) : (
            <form onSubmit={(e) => this.onSubmit(e)}>
              <input
                type="text"
                name="quote"
                placeholder="Quote"
                onChange={(e) => this.handleChange(e)}
              />
              <input type="submit" value="Post" />
            </form>
          )}
          <br />
              <div>
              <h4 style={{margin: '0px'}}>
                Status:
              </h4>
              {this.props.currentUser.activeTrip ? 
              (<p style={{marginTop: '2px', color: 'green'}}>Active</p>) : (<p style={{marginTop: '2px', color: 'red'}}>Offline</p>)}
              </div>

            <button
              onClick={logOut}
              className='logout'
            >
              Log Out
            </button>
         
        </div>
      </div>
    );
  }
}

export default ProfileView;