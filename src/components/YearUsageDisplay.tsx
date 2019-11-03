import { MonthDescription, YearDescription } from "../models/PeriodDescription";
import { PeriodUsageDisplay, IPeriodUsageDisplayProps, ElementWithTimeStamp } from "./PeriodUsageDisplay";

interface IProps extends IPeriodUsageDisplayProps {
    periodDescription: YearDescription;
}

export class YearUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
    labels(): number[] {
        var range = this.range(1, 13);

        return range;
    }

    tooltipLabel(month: string) {
        const intMonth = parseInt(month, 10);
        return this.monthDescriptionAt(intMonth - 1).toTitle();
    }

    positionInData(element: ElementWithTimeStamp, dataset: ElementWithTimeStamp[]): number {
        const years = dataset.map(el => new Date(el.time_stamp).getFullYear());
        const minYear = Math.min.apply(null, years);

        const date = new Date(element.time_stamp);

        return date.getMonth() + (date.getFullYear() - minYear) * 12;
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
        return 10000;
    }
}
