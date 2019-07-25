import {action, observable} from 'mobx';
import {LiveData} from '../models/LiveData';
import {PeriodDescription} from '../models/PeriodDescription';
import {UsageData} from '../models/UsageData';

export enum LoggedInState {
    Unknown = "Unknown",
    LoggedIn = "LoggedIn",
    NotLoggedIn = "NotLoggedIn"
};

export class EnergyUsageAppStore {
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


