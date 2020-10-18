import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { defaultFormatUtc } from "moment";
import { createStructuredSelector } from "reselect";
import { selectUserToCheckProfile } from '../store/selectors';
import { follow,unfollow } from "../store/actions/users";


class UserAside extends Component {
    constructor(props){
        super(props)
    }

 handleclick=()=>{
   const { userToVisit, currentUser, userToCheckProfile,follow,unfollow} = this.props
    userToCheckProfile && userToCheckProfile.followers &&userToCheckProfile.followers.includes(currentUser.user.username)?
    unfollow(userToCheckProfile._id, currentUser.user.username ):
   follow(userToCheckProfile._id, currentUser.user.username )
}
    render() {
        const { userToVisit, currentUser, userToCheckProfile,follow} = this.props
        const followers = userToCheckProfile && userToCheckProfile.followers ? userToCheckProfile.followers.length : null
        const followButton= userToCheckProfile && userToCheckProfile.followers &&userToCheckProfile.followers.includes(currentUser.user.username)?'unfollow':'follow'
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
                        <button className='follow'onClick={()=>this.handleclick()} >{followButton}</button>
                                        <span>followers:{followers}</span>
                                    </div>
                                </div>

                                : <div>
                                    <img
                                        src={currentUser.user.profileImageUrl}
                                        alt={currentUser.user.username}
                                        className="img-thumbnail"
                                    />

                                </div>
                        }
                    </div>
                </div>
            </aside>
        )
    }


}

const mapDispatchToProps = dispatch => ({
    follow: (idToFollow,currentUserName) => dispatch(follow(idToFollow,currentUserName)),
    unfollow: (idToUnfollow,currentUserName) => dispatch(unfollow(idToUnfollow,currentUserName))
})
export default connect(null, mapDispatchToProps)(UserAside);