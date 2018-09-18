import * as React from "react";
import { Component } from "react";

import LoginScreen from "./login-screen";
import CurrentUsage from "./current-usage";
import UsageGraphs from "./usage-graphs";
import ActualReadings from "./actual-readings";

interface IState {
    liveData: LiveData;
    loggedIn: boolean;
}

class LiveData {
    id: number;
    current: number;
    gas: number;
    stroom_dal: number;
    stroom_piek: number;
}

export default class EnergyUsageApp extends Component<{}, IState> {
    timer: any;

    constructor(props: {}, context: any) {
        super(props, context);
        this.state = { liveData: new LiveData(), loggedIn: true };
    }

    render() {
        if (this.state.loggedIn) {
            // Apparently, Chart.js doesn't understand 'height' and 'maxHeight' correctly, but only handles 'width' and 'max-width'.
            // The maxWidth here corresponds to filling a single screen (vertically) on my laptop.
            return (
                <div className="container" style={{ maxWidth: "500px" }}>
                    <div className="row">
                        <CurrentUsage id={this.state.liveData.id} current={this.state.liveData.current} />
                    </div>
                    <div className="row">
                        <UsageGraphs />
                    </div>
                    <div className="row">
                        <ActualReadings
                            stroom_dal={this.state.liveData.stroom_dal}
                            stroom_piek={this.state.liveData.stroom_piek}
                            gas={this.state.liveData.gas}
                        />
                    </div>
                </div>
            );
        } else {
            return <LoginScreen loginSuccessful={this.loggedIn.bind(this)} />;
        }
    }

    componentDidMount() {
        this.startLiveDataTimer();
    }

    componentWillUnmount() {
        this.stopLiveDataTimer();
    }

    startLiveDataTimer() {
        var retrieveLiveData = this.retrieveLiveData.bind(this);
        this.timer = setInterval(retrieveLiveData, 3000);
    }

    stopLiveDataTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    retrieveLiveData() {
        if (!this.state.loggedIn) {
            return;
        }

        fetch("/api/energy/current", { credentials: "include" })
            .then(response => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    case 401:
                        this.setState({ loggedIn: false });
                        throw "Not logged in";
                    case 404:
                        throw "Current energy usage not found!";
                    default:
                        throw "Error occurred: " + response.status;
                }
            })
            .then(json => {
                this.setState({
                    liveData: {
                        id: json.id,
                        current: json.current,
                        gas: json.gas,
                        stroom_dal: json.stroom_dal,
                        stroom_piek: json.stroom_piek,
                    },
                });
            });
    }

    loggedIn() {
        this.setState({ loggedIn: true });
    }
}
