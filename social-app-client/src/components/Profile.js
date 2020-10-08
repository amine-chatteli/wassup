import React from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";
import {connect} from 'react-redux';
import {selectTheUser} from '../store/selectors'
import { createStructuredSelector } from 'reselect';

const Profile = props => {

    return (
        <div className="row">
            
            <UserAside
                {...props} />
        </div>
    )
}

const mapStateToProps=(state,props)=>({
    userToVisit:selectTheUser(props.match.params.username)(state)
})
export default connect(mapStateToProps)(Profile);