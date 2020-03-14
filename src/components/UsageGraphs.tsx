import { observer } from "mobx-react";

import * as React from "react";
import { Component } from "react";

import { DayUsageDisplay } from "./DayUsageDisplay";
import { MonthUsageDisplay } from "./MonthUsageDisplay";
import { YearUsageDisplay } from "./YearUsageDisplay";
import { NavigationButtons } from "./NavigationButtons";
import { UsageData } from "../models/UsageData";

import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from "../models/PeriodDescription";
import {PeriodUsageDisplay} from "./PeriodUsageDisplay";

interface IProps {
    loadingData: boolean;
    periodUsage: Array<UsageData | null>;
    periodSelected: (periodDescription: PeriodDescription, skipPushState: boolean) => void;
    periodDescription: PeriodDescription;

}

@observer
export class UsageGraphs extends Component<IProps> {
    render() {
        const { loadingData, periodDescription } = this.props;

        if (periodDescription) {
            const usageDisplay = this.renderUsageDisplay(periodDescription);

            return (
                <div>
                    <h2>{periodDescription.toTitle()}</h2>

                    {usageDisplay}

                    <NavigationButtons
                        periodDescription={periodDescription}
                        onSelect={this.periodSelected.bind(this)}
                        enabled={!loadingData}
                    />
                </div>
            );
        } else {
            return null;
        }
    }

    private renderUsageDisplay(periodDescription: PeriodDescription) {
        const { loadingData, periodUsage } = this.props;

        let displayElementClass: any;

        if (periodDescription instanceof DayDescription) {
            displayElementClass = DayUsageDisplay;
        } else if (periodDescription instanceof MonthDescription) {
            displayElementClass = MonthUsageDisplay;
        } else if (periodDescription instanceof YearDescription) {
            displayElementClass = YearUsageDisplay;
        }

        return React.createElement(displayElementClass, {
            usage: periodUsage,
            periodDescription: periodDescription,
            onSelect: this.periodSelected.bind(this),
            enabled: !loadingData,
        });
    }

    periodSelected(periodDescription: PeriodDescription, skipPushState = false) {
        this.props.periodSelected(periodDescription, skipPushState);
    }
}
