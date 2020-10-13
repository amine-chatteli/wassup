import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages, removeMessage, updateMessage } from "../store/actions/messages";
import { fetchUsers } from "../store/actions/users";
import {createStructuredSelector} from 'reselect';
import {selectMessages,selectCurrentUser} from '../store/selectors'

import MessageItem from "../components/MessageItem";

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
    this.props.fetchUsers();
  }
  render() {
    let { messages, currentUser, userToVisit,profile } = this.props;

    if (userToVisit) {
      messages = messages.filter(m => m.user._id === userToVisit._id);
    }
    let messageList = messages.map(m => (
      <MessageItem
        key={m._id}
        messageId={m._id}
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage}
        isCorrectUser={currentUser.user.id === m.user._id}
        current={currentUser.user.id}
        updateMessage={updateMessage}
        fetchMessages={fetchMessages}
        {...this.props}
      />

    ));

    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          
          <ul className="list-group" id="messages">
            {  messageList}
          </ul>
        </div>
      </div>
    );
  }
}

const  mapStateToProps=state=>createStructuredSelector(
  {
    messages: selectMessages,
    currentUser: selectCurrentUser
  }
) 

export default connect(mapStateToProps, { fetchMessages, removeMessage, updateMessage, fetchUsers })(
  MessageList
);
