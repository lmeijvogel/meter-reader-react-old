import { DayDescription } from "../models/PeriodDescription";
import { PeriodUsageDisplay, ElementWithTimeStamp } from "./PeriodUsageDisplay";

export class DayUsageDisplay extends PeriodUsageDisplay<DayDescription> {
    labels(): number[] {
        return this.range(0, 24);
    }

    tooltipLabel(hour: string): string {
        const intHour = parseInt(hour, 10);
        const nextHour = (intHour + 1) % 24;
        return `${hour}:00 - ${nextHour}:00`;
    }

    positionInData(element: ElementWithTimeStamp, _dataset: ElementWithTimeStamp[]): number {
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

    maxWaterY() {
        return 200;
    }

    onClick = (_index: number) => {
        // NOP : There are no actions to be implemented for clicking on hours
    }
}
