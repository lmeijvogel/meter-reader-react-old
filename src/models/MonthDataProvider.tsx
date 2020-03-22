import { DayDescription, MonthDescription } from "./PeriodDescription";
import { PeriodDataProvider } from "./PeriodDataProvider";
import {UsageData} from "./UsageData";

export class MonthDataProvider extends PeriodDataProvider {
    constructor(public periodDescription: MonthDescription, public readonly periodUsage: Array<UsageData | null>) {
        super();
    }

    labels() {
        var range = this.range(1, this.maxDate() + 1);

        return range;
    }

    tooltipLabel = (day: string) => {
        const intDay = parseInt(day, 10);
        return this.descriptionAt(intDay).toTitle();
    }

    positionInData = (element: ElementWithTimeStamp, dataset: ElementWithTimeStamp[]) => {
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
        return new Date(this.periodDescription.year, this.periodDescription.month + 1, 0).getDate();
    }

    descriptionAt(index: number): DayDescription {
        return new DayDescription(this.periodDescription.year, this.periodDescription.month, index);
    }

    get maxGasY() {
        return 15;
    }

    get maxStroomY() {
        return 15;
    }

    get maxWaterY() {
        return 1000;
    }
}
