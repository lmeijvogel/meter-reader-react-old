import * as React from "react";
import { Component } from "react";

import { PeriodDescription } from "../models//PeriodDescription";
import { DataShifter } from "../helpers/DataShifter";
import { Chart } from "./Chart";
import { UsageData } from "../models/UsageData";

export interface IPeriodUsageDisplayProps {
    enabled: boolean;
    onSelect: (period: PeriodDescription) => void;
    usage: UsageData[];
}

export type ElementWithTimeStamp = {
    time_stamp: number;
};

export abstract class PeriodUsageDisplay<A extends IPeriodUsageDisplayProps, B> extends Component<A, B> {
    render() {
        const labels = this.labels();
        const dataShifter = new DataShifter();

        const data = dataShifter.call(this.props.usage, this.positionInData.bind(this));

        return (
            <div className={"PeriodUsageDisplay" + (this.props.enabled ? "" : " disabled")}>
                <Chart
                    label="Gas"
                    labels={labels}
                    data={data}
                    maxY={this.maxGasY()}
                    fieldName="gas"
                    color="#e73711"
                    onClick={this.onClick}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
                <Chart
                    label="Stroom"
                    labels={labels}
                    data={data}
                    maxY={this.maxStroomY()}
                    fieldName="stroom_totaal"
                    color="#f0ad4e"
                    onClick={this.onClick}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
                <Chart
                    label="Water"
                    labels={labels}
                    data={data}
                    maxY={this.maxWaterY()}
                    fieldName="water"
                    color="#428bca"
                    onClick={this.onClick}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
            </div>
        );
    }

    shouldComponentUpdate(nextProps: A, _nextState: B): boolean {
        return this.props.enabled !== nextProps.enabled || this.props.usage !== nextProps.usage;
    }

    protected range(start: number, end: number): number[] {
        let result: number[] = [];

        for (let i: number = start; i < end; i++) {
            result.push(i);
        }

        return result;
    }

    abstract onClick(index: number): void;

    abstract labels(): number[];
    abstract tooltipLabel(field: string): string;
    abstract positionInData(element: ElementWithTimeStamp, dataset: ElementWithTimeStamp[]): number;

    abstract maxGasY(): number;

    abstract maxStroomY(): number;

    abstract maxWaterY(): number;
}
