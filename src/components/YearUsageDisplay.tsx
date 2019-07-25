import * as React from "react";

import { MonthDescription, YearDescription } from "../models/PeriodDescription";
import { PeriodUsageDisplay, IPeriodUsageDisplayProps } from "./PeriodUsageDisplay";

interface IProps extends IPeriodUsageDisplayProps {
    periodDescription: YearDescription;
}

export class YearUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
    labels() {
        var range = this.range(1, 13);

        return range;
    }

    positionInData(element, dataset) {
        const years = dataset.map(el => new Date(el.time_stamp).getFullYear());
        const minYear = Math.min.apply(null, years);

        const date = new Date(element.time_stamp);

        return date.getMonth() + (date.getFullYear() - minYear) * 12;
    }

    tooltipLabel(month: number) {
        return this.monthDescriptionAt(month - 1).toTitle();
    }

    onClick(index: number) {
        this.props.onSelect(this.monthDescriptionAt(index));
    }

    monthDescriptionAt(index: number): MonthDescription {
        return new MonthDescription(this.props.periodDescription.year, index);
    }

    maxGasY() {
        return 300;
    }

    maxStroomY() {
        return 350;
    }

    maxWaterY() {
        return 4500;
    }
}
