import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/users";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { defaultFormatUtc } from "moment";
import {  createStructuredSelector } from "reselect";
import {selectUserToCheckProfile} from '../store/selectors'

class UserAside extends Component {

    componentDidMount() {
        const {fetchUser,userToVisit,currentUser}=this.props
        console.log(userToVisit);
        if (userToVisit){
            fetchUser(userToVisit)
        }
    }

    render() {
        const {userToVisit,currentUser,userToCheckProfile}=this.props
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

                                    </div>
                                </div>

                                : <img
                                    src={currentUser.user.profileImageUrl}
                                    alt={currentUser.user.username}
                                    className="img-thumbnail"
                                />
                        }
                    </div>
                </div>
            </aside>
        )
    }


}
const mapStateToProps=createStructuredSelector({
 userToCheckProfile:selectUserToCheckProfile
})
const mapDispatchToProps = dispatch => ({
    fetchUser: (id) => dispatch(fetchUser(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(
    UserAside
);