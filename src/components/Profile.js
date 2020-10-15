import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";
import { connect } from 'react-redux';
import { selectTheUser } from '../store/selectors'

const Profile = props => {
    return (
        <div className="row">
            <MessageList {...props} />
            <UserAside
                {...props} userToVisit={props.match.params.userId }
                />
        </div>
    )
}


export default Profile;