import React, { Component } from "react";

export default class AuthForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }
    handleChange = e => {
        //populate state with form data
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault(); //prevent default form behavious
        const authType = this.props.signup ? "signup" : "signin";
        this.props.onAuth(authType, this.state).then(() => {
            this.props.history.push("/");
        }).catch(() => {
            return;
        })
    }
    render() {
        const { email, username, password, profileImageUrl } = this.state;
        const { heading,
            buttonText,
            signup,
            errors,
            history,
            removeError
        } = this.props;
        history.listen(() => {
            removeError()
        })

        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
                            <input
                                type="text"
                                className="form-control"
                                id="email" name="email"
                                onChange={this.handleChange}
                                value={email}
                                placeholder="please Enter Your email"
                            />
                            <input
                                type="password"
                                className="form-control"
                                id="password" name="password"
                                onChange={this.handleChange}
                                placeholder="please enter your password"
                            />

                            { //render these to additional fields if authtype is signup
                                signup && (
                                    <div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username" name="username"
                                            onChange={this.handleChange}
                                            value={username}
                                            placeholder="please enter a username"
                                        />
                                    </div>
                                )}
                            <button type="submit" className="btn btn-primary btn-block btn-lg">{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

