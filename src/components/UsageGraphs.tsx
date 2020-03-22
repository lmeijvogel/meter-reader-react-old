import { observer } from "mobx-react";

import * as React from "react";
import { Component } from "react";

import { PeriodDataProvider } from "../models/PeriodDataProvider";
import { PeriodDescription } from "../models/PeriodDescription";

import { NavigationButtons } from "./NavigationButtons";
import { PeriodUsageDisplay } from "./PeriodUsageDisplay";
import {LoadingState} from "../stores/AppStore";
import {computed} from "mobx";

interface IProps {
    loadingState: LoadingState;
    periodSelected: (periodDescription: PeriodDescription, skipPushState: boolean) => void;
    dataProvider: PeriodDataProvider;
}

@observer
export class UsageGraphs extends Component<IProps> {
    render() {
        const { loadingState } = this.props;

        if (loadingState === LoadingState.Loaded) {
            const { periodDescription } = this.props.dataProvider;

            const usageDisplay = this.renderUsageDisplay();

            return (
                <div>
                    <h2>{periodDescription.toTitle()}</h2>

                        {usageDisplay}

                        <NavigationButtons
                            periodDescription={periodDescription}
                            onSelect={this.periodSelected}
                            enabled={this.enabled}
                        />
                </div>
            );
        }

        return null;
    }

    private renderUsageDisplay() {
        const { dataProvider } = this.props;

        return <PeriodUsageDisplay
            dataProvider={dataProvider}
            onSelect={this.periodSelected}
            enabled={this.enabled}
        />;
    }

    periodSelected = (periodDescription: PeriodDescription, skipPushState = false) => {
        this.props.periodSelected(periodDescription, skipPushState);
    }

    @computed
    private get enabled(): boolean {
        return this.props.loadingState == LoadingState.Loaded;
    }
}
