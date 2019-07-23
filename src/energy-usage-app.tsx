import * as React from "react";
import { Component } from "react";

import { action, observable } from "mobx";
import { observer } from "mobx-react";

import { LiveData } from './live-data';
import { LoginScreen } from "./login-screen";
import { CurrentUsage } from "./current-usage";
import { UsageData } from "./usage-data";
import { RecentUsageGraphs } from "./recent-usage-graphs";
import { UsageGraphs } from "./usage-graphs";
import { ActualReadings } from "./actual-readings";
import { LocationBarParser } from "./location-bar-parser";

import { PeriodDescription, MonthDescription } from "./period-description";

enum LoggedInState {
    Unknown = "Unknown",
    LoggedIn = "LoggedIn",
    NotLoggedIn = "NotLoggedIn"
};

export class EnergyUsageStore {
    @observable liveData: LiveData | null = null;
    @observable loggedIn: LoggedInState = LoggedInState.Unknown;
    @observable periodDescription: PeriodDescription;
    @observable periodUsage = observable<UsageData | null>([]);
    @observable loadingData: boolean = true;
    @observable showRecentUsage: boolean = false;

    @action
    setLiveData(liveData: LiveData) {
        this.liveData = liveData;
    }

    @action
    periodSelected = (periodDescription: PeriodDescription, skipPushState = false) => {
        const newLocation = periodDescription.toUrl();

        this.loadingData = true;

        if (!skipPushState) {
            window.history.pushState({ periodDescription: periodDescription }, newLocation, newLocation);
        }

        fetch("/api" + newLocation + ".json", { credentials: "include" })
            .then(response => {
                switch (response.status) {
                    case 200:
                        this.loggedIn = LoggedInState.LoggedIn;
                        return response.json();
                    case 401:
                        this.loggedIn = LoggedInState.NotLoggedIn;
                        throw "Not logged in";
                    default:
                        throw `Unexpected status ${response.status}`;
                }
            }
            )
            .then(json => {
                this.periodUsage.replace(json);
                this.periodDescription = periodDescription;
                this.loadingData = false;
            })
            .catch(e => {
                // No 'finally'?!?
                this.periodUsage.clear();
                this.periodDescription = periodDescription;
                this.loadingData = false;
            });
    }
}

type EnergyUsageProps = {
    store: EnergyUsageStore;
}

@observer
export class EnergyUsageApp extends Component<EnergyUsageProps> {
    timer: any | null = null;

    constructor(props: EnergyUsageProps) {
        super(props);
    }

    render() {
        const { liveData, loadingData, loggedIn, periodDescription, periodUsage, showRecentUsage } = this.props.store;

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
                                <RecentUsageGraphs onClick={this.recentUsageClicked} />
                                :
                                <UsageGraphs loadingData={loadingData} periodDescription={periodDescription} periodUsage={periodUsage} periodSelected={this.props.store.periodSelected} />
                            }
                        </div>
                        <div className="row">
                            {liveData &&
                                <ActualReadings
                                    stroom_dal={liveData.stroom_dal}
                                    stroom_piek={liveData.stroom_piek}
                                    gas={liveData.gas}
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

    initiallyDisplayedPeriod(): PeriodDescription {
        const now = new Date();
        return new MonthDescription(now.getFullYear(), now.getMonth() + 1);
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
        this.props.store.showRecentUsage = true;
    }

    @action
    recentUsageClicked = () => {
        this.props.store.showRecentUsage = false;
    }

    @action
    loginSuccessful = () => {
        this.props.store.loggedIn = LoggedInState.LoggedIn;

        this.selectPeriodFromLocationBar();
    }

}
