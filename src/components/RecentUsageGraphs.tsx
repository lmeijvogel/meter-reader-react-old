import { observer } from "mobx-react";
import * as React from "react";

import { Bar } from "react-chartjs-2";

import { RecentUsageGraphsStore } from '../stores/RecentUsageGraphsStore';

@observer
export class RecentUsageGraphs extends React.Component {
    store: RecentUsageGraphsStore;

    constructor() {
        super({}, {});

        this.store = new RecentUsageGraphsStore();
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
