import { userList, updateTracking } from '../firebase/firebase.utils';
import React, { Component } from 'react';
import {Link } from 'react-router-dom';

class Groups extends Component {
    
    state = {
        currentUser : false,
        userGroups: [],
        groups:false,
        userError: ''
    }

    async componentDidMount()
    {
        let  currentUser = this.props.currentUser
        this.setState({currentUser: this.props.currentUser})
    }

    joinGroup = (groupName) =>
    {
        let  currentUser = this.props.currentUser
        updateTracking(currentUser, groupName)      
    }

    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e)
    {
        e.preventDefault()
        let groupUsers = await userList();
        return groupUsers.map(ele => {
           if(this.state.email === ele.email)
           {
            this.setState({userGroups: ele.trackStock, groups:true})
           }
           else
           {
               this.setState({userError:"Incorrect email"})
           }
        })
    }

    displayGroups = () => {
        return this.state.userGroups.map(element => {
                return(
                <div>
                    <button onClick={() => this.joinGroup(element)}>{element}</button>
                </div>
                )
            })
    }

    render() {
        return (
            <div>
                <Link to="/creategroup"><button>Create Group</button></Link>
                {/* {this.state.currentUser ? this.joinGroup() : ('')} */}
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" onChange={(e) => this.handleChange(e)} placeholder="Search Friends Email" name="email"/>
                    <input type="submit" />
                </form>
                {this.state.groups ? this.displayGroups() : this.state.userError}
            </div>
        );
    }
}

export default Groups;