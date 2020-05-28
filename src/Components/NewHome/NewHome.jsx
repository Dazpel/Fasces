import React, { Component } from 'react';

class NewHome extends Component {
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
}

export default NewHome;