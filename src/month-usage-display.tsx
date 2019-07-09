import * as React from "react";

import { DayDescription, MonthDescription } from "./period-description";
import { PeriodUsageDisplay, IPeriodUsageDisplayProps } from "./period-usage-display";

interface IProps extends IPeriodUsageDisplayProps {
    periodDescription: MonthDescription;
}

export class MonthUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
    labels() {
        var range = this.range(1, this.maxDate() + 1);

        return range;
    }

    tooltipLabel(day) {
        return this.dayDescriptionAt(day).toTitle();
    }

    positionInData(element, dataset) {
        const date = new Date(element.time_stamp);
        const month = date.getMonth();

        const minMonth = new Date(dataset[0].time_stamp).getMonth();

        if (month === minMonth) {
            return date.getDate() - 1;
        } else {
            const lastDayInMonth = new Date(date.getFullYear(), minMonth + 1, 0, 12, 0, 0);

            return lastDayInMonth.getDate();
        }
    }

    maxDate() {
        // +1 because we want the 0th day of the next month (== last day of current month)
        return new Date(this.props.periodDescription.year, this.props.periodDescription.month + 1, 0).getDate();
    }

    onClick(index) {
        const newPeriod = new DayDescription(
            this.props.periodDescription.year,
            this.props.periodDescription.month,
            index + 1
        );

        this.props.onSelect(newPeriod);
    }

    dayDescriptionAt(index: number): DayDescription {
        return new DayDescription(this.props.periodDescription.year, this.props.periodDescription.month, index);
    }

    maxGasY() {
        return 15;
    }

    maxStroomY() {
        return 15;
    }

    maxWaterY() {
        return 1000;
    }
}
