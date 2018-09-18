import * as React from "react";
import { Component } from "react";

import { Bar } from "react-chartjs-2";

import { ArrayInterpolator } from "./array-interpolator";
import { RelativeConverter } from "./relative-converter";

interface IProps {
    label: string;
    labels: number[];
    data: number[];
    maxY: number;
    fieldName: string;
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
                text: this.chartTitle(),
            },
            legend: { display: false },
            tooltips: { callbacks: { title: titleCallback } },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            max: this.props.maxY,
                        },
                    },
                ],
            },
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
                    backgroundColor: this.props.color,
                },
            ],
        };
    }

    chartTitle(): string {
        return `${this.props.label} (${this.printableTotal} ${this.unit})`;
    }

    private get printableTotal(): number {
        const total = this.max() - this.min();
        return this.truncate(total, 3);
    }

    max(): number {
        return Math.max.apply(null, this.dataForField());
    }

    min(): number {
        return Math.min.apply(null, this.dataForField());
    }

    truncate(value, precision) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    dataForField() {
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
        }
    }

    onClick(event, data) {
        if (data[0]) {
            this.props.onClick(data[0]._index);
        }
    }
}
