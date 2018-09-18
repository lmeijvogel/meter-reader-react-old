import * as React from "react";
import { Component } from "react";

interface IProps {
    loginSuccessful: () => void;
}

interface IState {
    username: string;
    password: string;
    error?: string;
}

export class LoginScreen extends Component<IProps, IState> {
    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
            username: "user",
            password: "pass",
        };
    }

    render() {
        const errorMessage = this.state.error ? <div className="error-message">{this.state.error}</div> : "";

        return (
            <div className="login-dialog">
                {errorMessage}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={this.usernameChanged.bind(this)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.passwordChanged.bind(this)}
                />

                <button disabled={!this.isValid()} onClick={this.onClick.bind(this)}>
                    Submit
                </button>
            </div>
        );
    }

    usernameChanged(event) {
        this.setState({ username: event.target.value });
    }

    passwordChanged(event) {
        this.setState({ password: event.target.value });
    }

    isValid() {
        return this.state.username !== "" && this.state.password !== "";
    }

    onClick() {
        this.setState({ error: undefined });

        fetch("/api/login/create", {
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body: `username=${encodeURIComponent(this.state.username)}&password=${encodeURIComponent(
                this.state.password
            )}`,
        })
            .then(() => this.props.loginSuccessful())
            .catch(e => {
                console.log("Error");
                console.log(e);
                this.setState({ error: "Error logging in" });
            });
    }
}
