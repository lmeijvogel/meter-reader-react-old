import { action } from "mobx";
import { observer } from "mobx-react";

import * as React from "react";
import { Component } from "react";

import { LocationBarParser } from "../helpers/LocationBarParser";
import { AppStore, LoggedInState } from '../stores/AppStore';

import { LoginScreen } from "./LoginScreen";
import { CurrentUsage } from "./CurrentUsage";
import { RecentUsageGraphs } from "./RecentUsageGraphs";
import { UsageGraphs } from "./UsageGraphs";
import { ActualReadings } from "./ActualReadings";

type Props = {
    store: AppStore;
}

@observer
export class App extends Component<Props> {
    timer: any | null = null;

    render() {
        const { dataProvider, liveData, loadingState, loggedIn, showRecentUsage } = this.props.store;

        switch (loggedIn) {
            case LoggedInState.LoggedIn:
                // Apparently, Chart.js doesn't understand 'height' and 'maxHeight' correctly, but only handles 'width' and 'max-width'.
                // The maxWidth here corresponds to filling a single screen (vertically) on my laptop.
                return (
                    <div className="container" style={{ maxWidth: "500px" }}>
                        <div className="row">
                        <CurrentUsage liveData={liveData} onClick={this.currentUsageClicked} />
                        </div>
                        <div className="row">
                            {showRecentUsage ?
                            <div>
                                <RecentUsageGraphs />
                            </div>
                                :
                                <UsageGraphs loadingState={loadingState} dataProvider={dataProvider!} periodSelected={this.props.store.periodSelected} />
                            }
                        </div>
                            {!showRecentUsage &&
                                <div className="row">
                                    {liveData &&
                                    <ActualReadings
                                        stroom_dal={liveData.stroom_dal}
                                        stroom_piek={liveData.stroom_piek}
                                        gas={liveData.gas}
                                        />
                                    }
                                </div>
                            }
                    </div>
                );
            case LoggedInState.NotLoggedIn:
                return <LoginScreen loginSuccessful={this.loginSuccessful} />;
            case LoggedInState.Unknown:
                return null;
        }
    }

    componentDidMount() {
        this.selectPeriodFromLocationBar();

        window.onpopstate = (event: PopStateEvent) => {
            if (event.state.period) {
                this.props.store.periodSelected(event.state.period, true);
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

        this.props.store.periodSelected(period, false);
    }

    startLiveDataTimer() {
        this.timer = setInterval(this.retrieveLiveData, 3000);
    }

    stopLiveDataTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    retrieveLiveData = () => {
        if (this.props.store.loggedIn === LoggedInState.NotLoggedIn) {
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
                this.props.store.setLiveData({
                        id: json.id,
                        current: json.current,
                        gas: json.gas,
                        stroom_dal: json.stroom_dal,
                        stroom_piek: json.stroom_piek,
                 });
            });
    }

    @action
    currentUsageClicked = () => {
        this.props.store.showRecentUsage = !this.props.store.showRecentUsage;
    }

    @action
    loginSuccessful = () => {
        this.props.store.loggedIn = LoggedInState.LoggedIn;

        this.selectPeriodFromLocationBar();
    }

}
