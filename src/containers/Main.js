import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/WithAuth";
import MessageForm from "../containers/MessageForm";
import Profile from "../components/Profile";
import {selectCurrentUser,selectErrors} from '../store/selectors';
import {createStructuredSelector} from 'reselect'

const Main = props => {
    const { authUser, errors, removeError, currentUser, mymessages } = props;
    const ProfileWithAuth = withAuth(Profile)

    return (
      <div className="background">
            <div className="container">
            <Switch>
                <Route
                    exact path="/"
                    render={props => <Homepage currentUser={currentUser} {...props} />}
                />

                <Route
                    exact path="/signin"
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                buttonText="Log in"
                                heading="welcome back."
                                {...props}
                            />
                        )
                    }}
                />
                <Route
                    exact
                    path="/signup"
                    render={props => {
                        return (
                            <AuthForm
                                errors={errors}
                                removeError={removeError}
                                onAuth={authUser}
                                signup buttonText="sign me up"
                                heading="Join the community today"
                                {...props}
                            />
                        )
                    }}
                />
                  <Route
                    path="/profile/:userId"
                    render={props => (<ProfileWithAuth currentUser={currentUser} {...props} profile  />)}
                />
                <Route
                    path="/messages/new"
                    component={withAuth(MessageForm)}
                />

            </Switch>
        </div>
      </div>
    )
}

const mapStateToProps=state=>createStructuredSelector({
    currentUser: selectCurrentUser,
    errors: selectErrors
}
) 

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
