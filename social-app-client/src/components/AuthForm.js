import React, { Component } from "react";

export default class AuthForm extends Component {
    constructor(props) {
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: ""
        };
    }
    render() {
        const { email, username, password, profileImageUrl } = this.state;
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email" name="email"
                                onChange={this.handleChange}
                                value={email}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password" name="password"
                                onChange={this.handleChange}
                                value={email}
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

