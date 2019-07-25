import { action, computed, observable, IObservableArray } from "mobx";
import { observer } from "mobx-react";

import * as React from "react";

import { UsageData } from "../models/UsageData";
import { Bar } from "react-chartjs-2";

class RecentUsageStore {
    @observable json: IObservableArray<any> = observable([]);

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

    private decimate(input: UsageData[], interval: number): UsageData[] {
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

    private buildLabels(relevantUsages: UsageData[]) {
        return relevantUsages.map(u => {
            return u.time_stamp.slice(11, 16);
        });
    }

    private makeRelative(data: number[]): number[] {
        let last = data[0];

        return data.slice(1).map(el => {
            const value = el - last;

            last = el;

            return value;
        });
    }

    private truncate(value: number, precision: number) {
        return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }
}

@observer
export class RecentUsageGraphs extends React.Component {
    store: RecentUsageStore;

    constructor() {
        super({}, {});

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
        return <div className="recent-UsageData">
            <div className="recent-usage-graph">
                <Bar data={this.chartData()} options={this.chartOptions()} />
            </div>
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
        let lastItemHour = "";

        return {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        userCallback: (item: string) => {
                            const itemHour = item.slice(0, 2);

                            if (itemHour !== lastItemHour) {
                                lastItemHour = itemHour;
                                return itemHour;
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
                        min: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Stroom (Wh)"
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
                        min: 0,

                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Water (L)"
                    }
                }]

            },

            tooltips: {
                callbacks: {
                    title: (tooltipItem: any[], data) => {
                        const index = tooltipItem[0].index;

                        const timeStamp = data.labels[index];

                        return timeStamp;
                    }
                }
            }
        };
    }
}
