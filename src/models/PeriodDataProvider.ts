import { PeriodDescription } from "./PeriodDescription";

export type ElementWithTimeStamp = {
    time_stamp: number;
};

export abstract class PeriodDataProvider {
    abstract periodDescription: PeriodDescription;

    abstract labels(): number[];
    abstract tooltipLabel: (field: string) => string;
    abstract positionInData: (element: ElementWithTimeStamp, dataset: ElementWithTimeStamp[]) => number;

    abstract descriptionAt(index: number): PeriodDescription;

    abstract get maxGasY(): number;

    abstract get maxStroomY(): number;

    abstract get maxWaterY(): number;

    protected range(start: number, end: number): number[] {
        let result: number[] = [];

        for (let i: number = start; i < end; i++) {
            result.push(i);
        }

        return result;
    }
}
