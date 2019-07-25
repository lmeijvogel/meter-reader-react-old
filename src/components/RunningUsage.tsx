import { observable } from 'mobx';
import { observer } from 'mobx-react';

import * as React from "react";
import {LiveData} from '../models/LiveData';

enum MonitoringState {
    Unknown,
    NotMonitoring,
    Monitoring,
    RetrievalError
};

export class RunningUsageStore {
    @observable
    monitoringState: MonitoringState = MonitoringState.Unknown;

    @observable
    startingValues: LiveData | null;

    retrieveState() {
        fetch("/api/energy/running_usage", { credentials: "include" })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Could not retrieve monitoring state");
                }
            }).then(json => {
                if (json.running) {
                    this.monitoringState = MonitoringState.Monitoring;

                    this.startingValues = json.startingValues;
                } else {
                    this.monitoringState = MonitoringState.NotMonitoring;
                }
            }).catch(() => {
                this.monitoringState = MonitoringState.RetrievalError;
            });
    }
}

@observer
export class RunningUsage extends React.Component {
    @observable store: RunningUsageStore;

    constructor() {
        super({}, {});
        this.store = new RunningUsageStore();
    }

    componentDidMount() {
        this.store.retrieveState();
    }

    render() {
        switch (this.store.monitoringState) {
            case MonitoringState.Unknown:
                return <div>Loading Running Usage Monitor</div>
            case MonitoringState.NotMonitoring:
                return <div>Add a button here!</div>
            case MonitoringState.Monitoring:
                return <div>Monitoring</div>
        }
    }
}
