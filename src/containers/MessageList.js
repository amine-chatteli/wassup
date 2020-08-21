import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages, removeMessage,updateMessage } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }
  render() {
    let { messages, removeMessage, currentUser,mymessages } = this.props;

    if (mymessages) {
      messages = messages.filter(m => m.user._id === currentUser);
    }
    let messageList = messages.map(m => (
      <MessageItem
        key={m._id}
        messageId={m._id}
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        isCorrectUser={currentUser === m.user._id}
        current={currentUser}
        updateMessage={updateMessage}
        fetchMessages={fetchMessages}
      />

    ));

    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchMessages, removeMessage,updateMessage })(
  MessageList
);
