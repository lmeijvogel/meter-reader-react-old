import { observer } from "mobx-react";

import * as React from "react";
import { Component } from "react";

import { DayUsageDisplay } from "./day-usage-display";
import { MonthUsageDisplay } from "./month-usage-display";
import { YearUsageDisplay } from "./year-usage-display";
import { NavigationButtons } from "./navigation-buttons";
import { UsageData } from "../models/usage-data";

import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from "../models/period-description";

interface IProps {
    loadingData: boolean;
    periodUsage: Array<UsageData | null>;
    periodSelected: (periodDescription: PeriodDescription, skipPushState: boolean) => void;
    periodDescription: PeriodDescription;

}

@observer
export class UsageGraphs extends Component<IProps> {
    render() {
        const periodDescription = this.props.periodDescription;

        if (periodDescription) {
            let displayElementClass;

            if (periodDescription instanceof DayDescription) {
                displayElementClass = DayUsageDisplay;
            } else if (periodDescription instanceof MonthDescription) {
                displayElementClass = MonthUsageDisplay;
            } else if (periodDescription instanceof YearDescription) {
                displayElementClass = YearUsageDisplay;
            }

            const usageDisplay = React.createElement(displayElementClass, {
                usage: this.props.periodUsage,
                periodDescription: periodDescription,
                onSelect: this.periodSelected.bind(this),
                enabled: !this.props.loadingData,
            });

            return (
                <div>
                    <h2>{periodDescription.toTitle()}</h2>
                    {usageDisplay}
                    <NavigationButtons
                        periodDescription={periodDescription}
                        onSelect={this.periodSelected.bind(this)}
                        enabled={!this.props.loadingData}
                    />
                </div>
            );
        } else {
            return null;
        }
    }

    periodSelected(periodDescription: PeriodDescription, skipPushState = false) {
        this.props.periodSelected(periodDescription, skipPushState);
    }
}
