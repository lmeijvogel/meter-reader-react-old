import * as React from "react";
import { Component } from "react";

import { Bar } from "react-chartjs-2";

import { ArrayInterpolator } from "./array-interpolator";
import { RelativeConverter } from "./relative-converter";
import { PriceCalculator, PriceCategory } from "./price-calculator";

type Data = {
    gas: number;
    stroom_totaal: number;
    water: number;
    time_stamp: string;
};

type DataName =
    | "gas"
    | "water"
    | "stroom_totaal";

interface IProps {
    label: string;
    labels: number[];
    data: Data[];
    maxY: number;
    fieldName: DataName;
    color: string;
    onClick: (int) => void;
    tooltipLabelBuilder: () => void;
}

export class Chart extends Component<IProps, {}> {
    render() {
        var tooltipLabelBuilder = this.props.tooltipLabelBuilder;

        var titleCallback = function(tooltipItems, data) {
            // Pick first xLabel for now
            var title = "";
            var labels = data.labels;
            var labelCount = labels ? labels.length : 0;

            if (tooltipItems.length > 0) {
                var item = tooltipItems[0];

                if (item.xLabel) {
                    title = item.xLabel;
                } else if (labelCount > 0 && item.index < labelCount) {
                    title = labels[item.index];
                }
            }

            return tooltipLabelBuilder.call(null, title);
        };

        const options = {
            onClick: this.onClick.bind(this),
            responsive: true,
            title: {
                display: true,
                text: this.chartTitle()
            },
            legend: { display: false },
            tooltips: { callbacks: { title: titleCallback } },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            max: this.props.maxY
                        }
                    }
                ]
            }
        };

        return <Bar data={this.chartData()} options={options} />;
    }

    // TODO?
    chartData(): any {
        const interpolatedData = new ArrayInterpolator().call(this.dataForField());
        const relativeData = new RelativeConverter().convert(interpolatedData);
        const roundedData = relativeData.map(value => this.truncate(value, 3));

        return {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.label,
                    data: roundedData,
                    borderColor: this.props.color,
                    backgroundColor: this.props.color
                }
            ]
        };
    }

    chartTitle(): string {
        return `${this.props.label}: ${this.printableTotal} ${this.unit} (${this.printableCosts})`;
    }

    private get printableTotal(): number {
        const total = this.max() - this.min();
        return this.truncate(total, 3);
    }

    private get printableCosts(): string {
        const firstTimestamp = new Date(this.props.data[0].time_stamp);

        return PriceCalculator.costsFor(this.max() - this.min(), PriceCategory.Gas, firstTimestamp).toString();
    }

    max(): number {
        const actualValues = this.dataForField().filter(value => value !== null) as number[];

        return Math.max.apply(null, actualValues);
    }

    min(): number {
        const actualValues = this.dataForField().filter(value => value !== null) as number[];

        return Math.min.apply(null, actualValues);
    }

    truncate(value, precision) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    dataForField(): (number | null)[] {
        return this.props.data.map(u => {
            if (u) {
                return u[this.props.fieldName];
            } else {
                return null;
            }
        });
    }

    private get unit() {
        switch (this.props.fieldName) {
            case "gas":
                return "m³";
            case "stroom_totaal":
                return "kWh";
            case "water":
                return "L";
        }
    }

    onClick(event, data) {
        if (data[0]) {
            this.props.onClick(data[0]._index);
        }
    }
}
