import React, { Component } from 'react';

class NewHome extends Component {
    render() {
        return (
            <div class='App'>
                Here will be two buttons
                <br/>
                <button style={{backgroundColor:'lightgreen'}}>Join Group</button>
                <br/>
                <button style={{backgroundColor:'lightblue'}}>Create Group</button>
            </div>
        );
    }
}

export default NewHome;