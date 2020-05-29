import React, { Component } from 'react';
import {cosimo} from '../firebase/firebase.utils'
class Expenses extends Component {
    
    state = {
        string: ''
    }

    componentDidMount = async () => {
        let x = await cosimo(this.props.currentUser.displayName, this.props.currentUser.queryID)
        console.log(x)
        this.setState({
            string: x
        })
     }

    render() {
        
        return (
            <div>
                {this.state.string}
            </div>
        );
    }
}

export default Expenses;