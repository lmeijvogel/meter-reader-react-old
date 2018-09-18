import * as React from "react";

import { DayDescription } from "./period-description";
import { PeriodUsageDisplay, IPeriodUsageDisplayProps } from "./period-usage-display";

interface IProps extends IPeriodUsageDisplayProps {
    periodDescription: DayDescription;
}

export class DayUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
    labels(): number[] {
        return this.range(0, 24);
    }

    tooltipLabel(hour): string {
        const nextHour = (parseInt(hour, 10) + 1) % 24;
        return "" + hour + ":00 - " + nextHour + ":00";
    }

    positionInData(element, dataset) {
        const periodDescription = this.props.periodDescription;

        const currentDate = new Date(periodDescription.year, periodDescription.month, periodDescription.day);

        const elementTime = new Date(element.time_stamp);
        const elementDate = new Date(elementTime.getFullYear(), elementTime.getMonth(), elementTime.getDate());

        const oneDay = 24 * 60 * 60 * 1000;
        const dayDifference = (elementDate.getTime() - currentDate.getTime()) / oneDay;

        return elementTime.getHours() + dayDifference * 24;
    }

    maxGasY() {
        return 2;
    }

    maxStroomY() {
        return 1.5;
    }

    onClick(index) {
        // NOP : There are no actions to be implemented for clicking on hours
    }
}
