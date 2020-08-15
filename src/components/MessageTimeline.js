import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeline = props => {
    return (
        <div className="row">
            <MessageList />
            <UserAside
                profileImageUrl={props.profileImageUrl}
                username={props.username} />
        </div>
    )
}
export default MessageTimeline;