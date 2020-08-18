import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/WithAuth";
import MessageForm from "../containers/MessageForm";
import MessageList from "./MessageList";
import MessageTimeline from "../components/MessageTimeline";
const Main = props => {
    const { authUser, errors, removeError, currentUser,mymessages } = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/"
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
                    path="/users/:id/messages/new"
                    component={withAuth(<MessageForm {...props}/>)}
                />
                 <Route
                    path="/users/:id/messages/mymessages"
                    component={withAuth(<MessageTimeline  currentUser={currentUser} mymessages/>)}
                />
                
                
            </Switch>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}
export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
