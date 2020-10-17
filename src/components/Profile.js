import React, { Component } from "react";
import MessageList from "../containers/MessageList";
import UserAside from "./UserAside";
import { connect } from 'react-redux';
import { fetchUser } from "../store/actions/users";
import { selectFetching, selectUserToCheckProfile } from '../store/selectors'
import { createStructuredSelector } from "reselect";

class Profile extends Component {

    componentDidMount() {
        const { fetchUser } = this.props;
        fetchUser(this.props.match.params.userId)
    }
    render() {
        const { fetching, userToCheckProfile } = this.props
        console.log(userToCheckProfile)
      

        return (
            <div className="row">
                <MessageList
                    userToVisit={this.props.match.params.userId} {...this.props}
                />
                {
                    !fetching ?
                        <UserAside
                            {...this.props} userToCheckProfile={userToCheckProfile}
                            userToVisit={this.props.match.params.userId}
                        />
                        : 'waiting.....'
                }
            </div>
        )
    }
}

const mapStateToProps = state => createStructuredSelector({
    fetching: selectFetching,
    userToCheckProfile: selectUserToCheckProfile

})
const mapDispatchToProps = dispatch => ({
    fetchUser: (id) => dispatch(fetchUser(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);