import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { defaultFormatUtc } from "moment";
import { createStructuredSelector } from "reselect";
import { selectUserToCheckProfile } from '../store/selectors'

class UserAside extends Component {

    render() {
        const { userToVisit, currentUser, userToCheckProfile } = this.props
        const followers = userToCheckProfile && userToCheckProfile.followers ? userToCheckProfile.followers.length : null
        return (
            <aside className="col-sm-2">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {
                            userToVisit ?
                                <div>
                                    <img
                                        src={userToCheckProfile.profileImageUrl}
                                        alt={userToCheckProfile.username}
                                        className="img-thumbnail"
                                    />
                                    <div>
                                        <button className='follow' >follow</button>
                                     <span>followers:{followers}</span>
                                    </div>
                                </div>

                                : <div>
                                    <img
                                        src={currentUser.user.profileImageUrl}
                                        alt={currentUser.user.username}
                                        className="img-thumbnail"
                                    />
                                    <div>
                                        <button className='follow' >follow</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </aside>
        )
    }


}

export default UserAside;