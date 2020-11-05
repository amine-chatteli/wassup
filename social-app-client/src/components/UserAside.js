import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { defaultFormatUtc } from "moment";
import { createStructuredSelector } from "reselect";
import { selectShowFollowers} from '../store/selectors';
import { follow,unfollow,showFollowers } from "../store/actions/users";


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
        const { userToVisit, currentUser, userToCheckProfile,showFollowers, thisShowFollowers} = this.props
        const followers = userToCheckProfile && userToCheckProfile.followers ? userToCheckProfile.followers.length : null
        const followButton= userToCheckProfile && userToCheckProfile.followers &&userToCheckProfile.followers.includes(currentUser.user.username)?'unfollow':'follow'
    const followersList=userToCheckProfile&&userToCheckProfile.followers? <ul>{userToCheckProfile.followers.map(item=><li key={item}>{item}</li>)}</ul>:null
       console.log(selectShowFollowers);
        return (
            <aside className="col-sm-2">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {
                            userToVisit ?
                                <div>
                                    <img
                                        src={userToCheckProfile.profileImageUrl||DefaultProfileImg}
                                        alt={userToCheckProfile.username}
                                        className="img-thumbnail"
                                    />
                                    <div className="followers">
                        <button className='follow'onClick={()=>this.handleclick()} >{followButton}</button>
                        <button onClick={showFollowers}>{followers} followers</button> 
                                        {thisShowFollowers? followersList:null}
                                    </div>
                                </div>

                                : <div>
                                    <img
                                        src={currentUser.user.profileImageUrl||DefaultProfileImg}
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
const mapStateToProps=state=>createStructuredSelector({
    thisShowFollowers:selectShowFollowers
})
const mapDispatchToProps = dispatch => ({
    follow: (idToFollow,currentUserName) => dispatch(follow(idToFollow,currentUserName)),
    unfollow: (idToUnfollow,currentUserName) => dispatch(unfollow(idToUnfollow,currentUserName)),
    showFollowers:()=>dispatch(showFollowers())
})
export default connect(mapStateToProps, mapDispatchToProps)(UserAside);