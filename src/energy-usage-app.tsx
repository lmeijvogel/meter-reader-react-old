import * as React from "react";
import { Component } from "react";

import { LoginScreen } from "./login-screen";
import { CurrentUsage } from "./current-usage";
import { UsageData } from "./usage-data";
import { RecentUsageGraphs } from "./recent-usage-graphs";
import { UsageGraphs } from "./usage-graphs";
import { ActualReadings } from "./actual-readings";
import { LocationBarParser } from "./location-bar-parser";

import { PeriodDescription, MonthDescription } from "./period-description";

enum LoggedInState {
    Unknown,
    LoggedIn,
    NotLoggedIn
};

interface IState {
    liveData: LiveData | null;
    loggedIn: LoggedInState;
    periodDescription: PeriodDescription;
    periodUsage: (UsageData | null)[];
    loadingData: boolean;
    showRecentUsage: boolean;
}

class LiveData {
    id: number;
    current: number;
    gas: number;
    stroom_dal: number;
    stroom_piek: number;
}

export class EnergyUsageApp extends Component<{}, IState> {
    timer: any;

    constructor(props: {}, context: any) {
        super(props);

        this.state = {
            liveData: null,
            periodUsage: [],
            periodDescription: this.initiallyDisplayedPeriod(),
            loadingData: true,
            loggedIn: LoggedInState.Unknown,
            showRecentUsage: false
        };
    }

    render() {
        const { loggedIn, showRecentUsage } = this.state;

        switch (loggedIn) {
            case LoggedInState.LoggedIn:
                // Apparently, Chart.js doesn't understand 'height' and 'maxHeight' correctly, but only handles 'width' and 'max-width'.
                // The maxWidth here corresponds to filling a single screen (vertically) on my laptop.
                return (
                    <div className="container" style={{ maxWidth: "500px" }}>
                        <div className="row">
                        <CurrentUsage liveData={this.state.liveData} onClick={this.currentUsageClicked} />
                        </div>
                        <div className="row">
                            {showRecentUsage ?
                                <RecentUsageGraphs onClick={this.recentUsageClicked} />
                                :
                                <UsageGraphs loadingData={this.state.loadingData} periodDescription={this.state.periodDescription} periodUsage={this.state.periodUsage} periodSelected={this.periodSelected} />
                            }
                        </div>
                        <div className="row">
                            {this.state.liveData &&
                                <ActualReadings
                                    stroom_dal={this.state.liveData.stroom_dal}
                                    stroom_piek={this.state.liveData.stroom_piek}
                                    gas={this.state.liveData.gas}
                                />
                            }
                        </div>
                    </div>
                );
                break;
            case LoggedInState.NotLoggedIn:
                return <LoginScreen loginSuccessful={this.loginSuccessful} />;
                break;
            case LoggedInState.Unknown:
                return null;
                break
        }
    }

    componentDidMount() {
        this.selectPeriodFromLocationBar();

        window.onpopstate = event => {
            if (event.state.period) {
                this.periodSelected(event.state.period, true);
            }
        };

        this.startLiveDataTimer();
    }

    componentWillUnmount() {
        this.stopLiveDataTimer();
    }

    selectPeriodFromLocationBar() {
        const locationBarParser = new LocationBarParser();

        const period = locationBarParser.parse(window.location.pathname);

        this.periodSelected(period, false);
    }

    initiallyDisplayedPeriod(): PeriodDescription {
        return new MonthDescription(2019, 7);
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
        if (this.state.loggedIn === LoggedInState.NotLoggedIn) {
            return;
        }

        fetch("/api/energy/current", { credentials: "include" })
            .then(response => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    case 401:
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

    periodSelected = (periodDescription: PeriodDescription, skipPushState = false) => {
        const newLocation = periodDescription.toUrl();

        this.setState({ loadingData: true });

        if (!skipPushState) {
            window.history.pushState({ periodDescription: periodDescription }, newLocation, newLocation);
        }

        fetch("/api" + newLocation + ".json", { credentials: "include" })
            .then(response => {
                switch (response.status) {
                    case 200:
                        console.log("This.state: ", this.state);
                        this.setState({ loggedIn: LoggedInState.LoggedIn });
                        return response.json();
                    case 401:
                        this.setState({ loggedIn: LoggedInState.NotLoggedIn });
                        throw "Not logged in";
                    default:
                        throw `Unexpected status ${response.status}`;
                }
            }
            )
            .then(json => {
                const newState = { periodUsage: json, periodDescription: periodDescription, loadingData: false };

                this.setState(newState);
            })
            .catch(e => {
                // No 'finally'?!?
                this.setState({ periodUsage: [], periodDescription: periodDescription, loadingData: false });
            });
    }

    currentUsageClicked = () => {
        this.setState({ showRecentUsage: true });
    }

    recentUsageClicked = () => {
        this.setState({showRecentUsage: false });
    }

    loginSuccessful = () => {
        this.setState({ loggedIn: LoggedInState.LoggedIn });

        this.selectPeriodFromLocationBar();
    }

}
