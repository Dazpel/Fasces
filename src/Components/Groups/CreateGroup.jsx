import React, { Component } from 'react';
import {updateTracking} from '../firebase/firebase.utils';
class CreateGroup extends Component {

    state = {
        groupName: '',
        password: ''
    }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()
        if(this.state.groupName)
        {
            let  currentUser = this.props.currentUser
            updateTracking(currentUser, this.state.groupName)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) =>this.handleSubmit(e)}>
                    <input name="groupName" type="text" placeholder="Group Name" onChange={(e) => this.handleChange(e)} />
                    <input name="password" type="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default CreateGroup;