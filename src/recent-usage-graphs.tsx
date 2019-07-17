import * as React from "react";

import { Line } from "react-chartjs-2";

type Props = {
    onClick: () => void;
};

type State = {
    waterData: number[];
    stroomData: number[];
    labels: string[];
}

export class RecentUsageGraphs extends React.Component<Props, State> {
    _labels: string[];

    constructor(props) {
        super(props);

        this.state = {
            waterData: [],
            stroomData: [],
            labels: []
        };
    }

    componentDidMount() {
        fetch("/api/energy/recent", { credentials: "include" })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return [];
                }
            }).then(json => {
                // this.decimate(json.reverse());
                const relevantUsages = this.decimate(json.reverse(), 2);
                console.log(relevantUsages.length);
                const waterData = this.makeRelative(relevantUsages.map(u => u.water));

                const stroomTotals = relevantUsages.map(u => u.stroom_dal + u.stroom_piek);
                console.log(stroomTotals);
                const stroomData = this.makeRelative(stroomTotals).map(u => this.truncate(u * 1000, 2));

                const labels = this.buildLabels(relevantUsages);

                this.setState({ waterData: waterData, stroomData: stroomData, labels: labels });
            });
    }

    decimate(input: any[], interval: number): any[] {
        let numberUntilNextEntry = 0;

        return input.filter(_ => {
            if (numberUntilNextEntry <= 0) {
                numberUntilNextEntry = interval;

                return true;
            } else {
                numberUntilNextEntry--;
                return false;
            }
        });
    }

    buildLabels(relevantUsages: any[]) {
        return relevantUsages.map(u => {
            return u.time_stamp.slice(11, 13);
        });
    }


    render() {
        return <div className="recent-usage-graph" onClick={this.onClick}>
            <Line data={this.chartData()} options={this.chartOptions()} />
        </div>;
    }

    chartData(): any {
        const { waterData, stroomData, labels } = this.state;

        return {
            labels: labels,
            datasets: [
                {
                    label: "Stroom",
                    legendText: "Stroom",
                    data: stroomData,
                    fill: false,
                    borderColor: "#f0ad4e",
                    borderWidth: "1.5",
                    pointRadius: 0,
                    yAxisID: "stroom"
                },
                {
                    label: "Water",
                    legendText: "Stroom",
                    data: waterData,
                    fill: false,
                    borderColor: "#428bca",
                    borderWidth: "1.5",
                    pointRadius: 0,
                    yAxisID: "water"
                }
            ],
        };
    }

    makeRelative(data: number[]): number[] {
        let last = data[0];

        return data.slice(1).map(el => {
            const value = el - last;

            last = el;

            return value;
        });
    }

    chartOptions(): any {
        let lastLabel = "";

        return {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        userCallback: (item, index) => {
                            if (item !== lastLabel) {
                                lastLabel = item;
                                return item;
                            }
                        },
                        autoSkip: false,
                        display: true
                    },

                }],
                yAxes: [{
                    id: "stroom",
                    title: "Stroom",
                    position: "left",
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: true,
                        // tickInterval: 0.002,
                        min: 0,
                        // max: 2
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Stroom"
                    }
                },
                {
                    id: "water",
                    title: "Water",
                    position: "right",
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        display: true,
                        // tickInterval: 1,
                        min: 0,
                        // max: 10

                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Water"
                    }
                }]

            },
        };
    }

    onClick = () => {
        this.props.onClick();
    }

    truncate(value, precision) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }

}
