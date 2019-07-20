import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";

import * as React from "react";

import { UsageData } from "./usage-data";
import { Bar } from "react-chartjs-2";

class RecentUsageStore {
    @observable json: any = [];

    @action
    setData(json: any) {
        this.json.replace(json);
    }

    @computed
    get relevantUsages(): UsageData[] {
        const lastHalf = this.json.slice(0, this.json.length / 2).reverse();

        return this.decimate(lastHalf, 12);
    }

    @computed
    get waterData(): number[] {
        return this.makeRelative(this.relevantUsages.map(u => u.water));
    }

    @computed
    get stroomData(): number[] {
        const stroomTotals = this.relevantUsages.map(u => u.stroom_dal + u.stroom_piek);
        return this.makeRelative(stroomTotals).map(u => this.truncate(u * 1000, 2));
    }

    @computed
    get labels(): string[] {
        return  this.buildLabels(this.relevantUsages);
    }


    private

    decimate(input: UsageData[], interval: number): UsageData[] {
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

    buildLabels(relevantUsages: UsageData[]) {
        return relevantUsages.map(u => {
            return u.time_stamp.slice(11, 13);
        });
    }

    makeRelative(data: number[]): number[] {
        let last = data[0];

        return data.slice(1).map(el => {
            const value = el - last;

            last = el;

            return value;
        });
    }

    truncate(value, precision) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }
}

type Props = {
    onClick: () => void;
};

@observer
export class RecentUsageGraphs extends React.Component<Props> {
    store: RecentUsageStore;

    constructor(props) {
        super(props);

        this.store = new RecentUsageStore();
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
                this.store.setData(json);
            });
    }

    render() {
        return <div className="recent-usage-graph" onClick={this.onClick}>
            <Bar data={this.chartData()} options={this.chartOptions()} />
        </div>;
    }

    chartData(): any {
        const { waterData, stroomData, labels } = this.store;

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
}
