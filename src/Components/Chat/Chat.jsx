import React, { Component } from 'react';
import Talk from 'talkjs';
import { userList } from '../firebase/firebase.utils';
import Topbar from '../navbar/Topbar'
import './chat.css';
import BackButton from './BackButton'
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.talkjsContainer = React.createRef();
    this.state = {
      groupUsers: '',
    };
  }

  async componentDidMount() {
    const setParticipants = (users, currentUser) => {
      let x = [];
      users.map((el, i) => {
        if (el.id !== currentUser) {
          x.push(
            new Talk.User({
              id: el.id,
              name: el.displayName,
              email: el.email,
              photoUrl: el.photoURL,
              welcomeMessage: 'Hey there! How are you? :-)',
            })
          );
        }
      });

      return x;
    };
    const currentUser = this.props.currentUser;
    let groupUsers = await userList();

    this.setState({
      groupUsers: groupUsers,
    });

    Talk.ready.then(() => {
      var me = new Talk.User({
        id: currentUser.id,
        name: currentUser.displayName,
        email: currentUser.email,
        photoUrl: currentUser.photoURL,
        welcomeMessage: 'Hey there! How are you? :-)',
      });

      window.talkSession = new Talk.Session({
        appId: 'taa7PJf6',
        me: me,
      });

      let participants = setParticipants(this.state.groupUsers, currentUser.id);

      // var conversation = window.talkSession.getOrCreateConversation(
      //   `splitexproject3`
      // );

      var conversation = window.talkSession.getOrCreateConversation(
        this.props.match.params.id
      );

      conversation.setParticipant(me);

      participants.map((el) => {
        conversation.setParticipant(el);
      });

      conversation.setAttributes({
        photoUrl: 'https://avatars0.githubusercontent.com/u/4854004?s=280&v=4',
        subject: 'Testing TalkJS',
      });

      var chatbox = window.talkSession.createChatbox(conversation);
      chatbox.mount(this.talkjsContainer.current);
    });
  }

  render() {
    console.log(this.state.groupUsers);
    return (
      <div className="full-view">
      <div className="top">
      <BackButton/>
      </div>
    <div className="chatbox-container" ref={this.talkjsContainer}>
    </div>
    </div>
    )}
}
