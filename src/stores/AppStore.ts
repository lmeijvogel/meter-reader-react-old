import {action, observable} from 'mobx';
import {LiveData} from '../models/LiveData';
import {PeriodDescription, YearDescription, MonthDescription, DayDescription} from '../models/PeriodDescription';
import {UsageData} from '../models/UsageData';
import {RunningUsageStore} from './RunningUsageStore';
import {PeriodDataProvider} from '../models/PeriodDataProvider';
import {YearDataProvider} from '../models/YearDataProvider';
import {MonthDataProvider} from '../models/MonthDataProvider';
import {DayDataProvider} from '../models/DayDataProvider';

export enum LoggedInState {
    Unknown = "Unknown",
    LoggedIn = "LoggedIn",
    NotLoggedIn = "NotLoggedIn"
};

// Explicitly doesn't have a state 'Loading' since we're never checking for it anyway:
// If it is loading, it should still draw the data that is already present,
// otherwise the graphs will disappear and appear instead of animate.
export enum LoadingState {
    NotLoaded = 0,
    Loaded,
    ErrorLoading
}

export class AppStore {
    @observable liveData: LiveData | null = null;
    @observable loggedIn: LoggedInState = LoggedInState.Unknown;
    @observable dataProvider: PeriodDataProvider | null;
    @observable periodUsage = observable<UsageData | null>([]);
    @observable loadingState: LoadingState = LoadingState.NotLoaded;
    @observable showRecentUsage: boolean = false;

    @observable runningUsageStore: RunningUsageStore = new RunningUsageStore();

    @action
    setLiveData(liveData: LiveData) {
        this.liveData = liveData;
    }

    @action
    periodSelected = (periodDescription: PeriodDescription, skipPushState = false) => {
        const newLocation = periodDescription.toUrl();

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
                    case 502:
                        throw "Bad gateway";
                    default:
                        throw `Unexpected status ${response.status}`;
                }
            })
            .then(json => this.setData(periodDescription, json))
            .catch(() => this.setErrorState());
    }

    @action
    private setData = (periodDescription: PeriodDescription, json: any) => {
        this.periodUsage.replace(json);
        this.dataProvider = this.buildDataProvider(periodDescription);

        this.loadingState = LoadingState.Loaded;
    }

    @action
    private setErrorState = () => {
        this.dataProvider = null;
        this.periodUsage.clear();

        this.loadingState = LoadingState.ErrorLoading;
    }

    private buildDataProvider(periodDescription: PeriodDescription): PeriodDataProvider {
        if (periodDescription instanceof YearDescription) {
            return new YearDataProvider(periodDescription);
        }

        if (periodDescription instanceof MonthDescription) {
            return new MonthDataProvider(periodDescription);
        }

        if (periodDescription instanceof DayDescription) {
            return new DayDataProvider(periodDescription);
        }

        throw new Error(`Unexpected periodDescription type: ${periodDescription}`);
    }
}
