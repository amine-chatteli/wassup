import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";

const MessageTimeline = props => {
    return (
        <div className="row">
            <MessageList {...props}  />
            <UserAside
                {...props} />
        </div>
    )
}
export default MessageTimeline;