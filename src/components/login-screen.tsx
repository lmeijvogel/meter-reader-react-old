import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import * as React from "react";
import { Component } from "react";

interface IProps {
    loginSuccessful: () => void;
}

class LoginStore {
    @observable username: string = "";
    @observable password: string = "";
    @observable error: string | null = null;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    @computed
    get isValid() {
        return this.username !== "" && this.password !== "";
    }

    async submit() {
        this.error = null;

        return fetch("/api/login/create", {
            credentials: "include",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            method: "POST",
            body: `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(
                this.password
            )}`,
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        return;
                    case 401:
                        this.error = "Unknown username or password";
                        throw new Error("Unknown username or password");
                    default:
                        this.error = "Something went wrong";
                        throw new Error("Something went wrong");
                }
            });
    }
}

@observer
export class LoginScreen extends Component<IProps> {
    store: LoginStore;

    constructor(props: IProps) {
        super(props);

        this.store = new LoginStore("user", "pass");
    }

    render() {
        const { error } = this.store;

        const errorMessage = error ? <div className="error-message">{error}</div> : "";

        return (
            <div className="login-dialog">
                {errorMessage}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={this.onUsernameChange}
                    onKeyDown={this.onFieldKeydown}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                    onKeyDown={this.onFieldKeydown}
                />

                <button disabled={!this.store.isValid} onClick={this.onClick}>
                    Submit
                </button>
            </div>
        );
    }

    onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.store.username = event.target.value;
        this.store.error = null;
    }

    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.store.password = event.target.value;
        this.store.error = null;
    }

    onClick = () => {
        this.submit();
    }

    onFieldKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode == 13) {
            this.submit();
        }
    }

    submit() {
        this.store.submit().then(() => {
            this.props.loginSuccessful();
        });
    }
}
