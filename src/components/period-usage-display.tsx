import * as React from "react";
import { Component } from "react";

import { PeriodDescription } from "../models//period-description";
import { DataShifter } from "../helpers/data-shifter";
import { Chart } from "./chart";
import { UsageData } from "../models/usage-data";

export interface IPeriodUsageDisplayProps {
    enabled: boolean;
    onSelect: (period: PeriodDescription) => void;
    usage: UsageData[];
}

export abstract class PeriodUsageDisplay<A extends IPeriodUsageDisplayProps, B> extends Component<A, B> {
    render() {
        const labels = this.labels();
        const dataShifter = new DataShifter();

        const data = dataShifter.call(this.props.usage, this.positionInData.bind(this));

        return (
            <div className={"period-usage-display" + (this.props.enabled ? "" : " disabled")}>
                <Chart
                    label="Gas"
                    labels={labels}
                    data={data}
                    maxY={this.maxGasY()}
                    fieldName="gas"
                    color="#e73711"
                    onClick={this.onClick.bind(this)}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
                <Chart
                    label="Stroom"
                    labels={labels}
                    data={data}
                    maxY={this.maxStroomY()}
                    fieldName="stroom_totaal"
                    color="#f0ad4e"
                    onClick={this.onClick.bind(this)}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
                <Chart
                    label="Water"
                    labels={labels}
                    data={data}
                    maxY={this.maxWaterY()}
                    fieldName="water"
                    color="#428bca"
                    onClick={this.onClick.bind(this)}
                    tooltipLabelBuilder={this.tooltipLabel.bind(this)}
                />
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState): boolean {
        return this.props.enabled !== nextProps.enabled || this.props.usage !== nextProps.usage;
    }

    protected range(start: number, end: number): number[] {
        let result: number[] = [];

        for (let i: number = start; i < end; i++) {
            result.push(i);
        }

        return result;
    }

    abstract onClick(index): void;

    abstract labels(): number[];
    abstract tooltipLabel(field: number): string;
    abstract positionInData(element, dataset): number;

    abstract maxGasY(): number;

    abstract maxStroomY(): number;

    abstract maxWaterY(): number;
}
