import { observer } from "mobx-react";
import * as React from "react";

import { Bar } from "react-chartjs-2";

import { RecentUsageGraphsStore } from "../stores/RecentUsageGraphsStore";

@observer
export class RecentUsageGraphs extends React.Component {
  store: RecentUsageGraphsStore;

  constructor(props: {}) {
    super(props);

    this.store = new RecentUsageGraphsStore();
  }

  componentDidMount() {
    fetch("/api/energy/recent", { credentials: "include" })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((json) => {
        this.store.setData(json);
      });
  }

  render() {
    return (
      <div className="recent-UsageData">
        <div className="recent-usage-graph">
          <Bar
            data={this.stroomChartData()}
            options={this.chartOptions(this.stroomYAxis())}
          />
          <Bar
            data={this.waterChartData()}
            options={this.chartOptions(this.waterYAxis())}
          />
        </div>
      </div>
    );
  }

  stroomChartData(): Chart.ChartData {
    const { stroomData, labels } = this.store;

    return {
      labels: labels,
      datasets: [
        {
          label: "Stroom",
          data: stroomData,
          fill: false,
          borderColor: "#f0ad4e",
          borderWidth: 1.5,
          pointRadius: 0,
          yAxisID: "stroom",
        },
      ],
    };
  }

  waterChartData(): Chart.ChartData {
    const { waterData, labels } = this.store;

    return {
      labels: labels,
      datasets: [
        {
          label: "Water",
          data: waterData,
          fill: false,
          borderColor: "#428bca",
          borderWidth: 1.5,
          pointRadius: 0,
          yAxisID: "water",
        },
      ],
    };
  }

  chartOptions(yAxis: Chart.ChartScales): Chart.ChartOptions {
    let lastItemHour = "";

    // These anys are also in the typings provided for Chartjs
    // and are unused anyway.
    const tickCallback = (value: string, _index: any, _values: any) => {
      const itemHour = value.slice(0, 2);

      if (itemHour !== lastItemHour) {
        lastItemHour = itemHour;
        return itemHour;
      }

      return "";
    };

    return {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
            },
            ticks: {
              callback: tickCallback,
              autoSkip: false,
              display: true,
            },
          },
        ],
        yAxes: [yAxis],
      },

      tooltips: {
        callbacks: {
          // TODO: Any
          title: (item: Chart.ChartTooltipItem[], data: Chart.ChartData) => {
            if (!data.labels) return "";

            const index = item[0].index;

            if (!index) return "";

            const timeStamp = data.labels[index];

            return timeStamp?.toString() || "";
          },
        },
      },
    };
  }

  stroomYAxis(): Chart.ChartScales & { id: string; title: string } {
    return {
      id: "stroom",
      title: "Stroom",
      position: "left",
      gridLines: {
        display: false,
      },
      ticks: {
        display: true,
        min: 0,
      },
      scaleLabel: {
        display: true,
        labelString: "Stroom (Wh)",
      },
    };
  }

  waterYAxis(): Chart.ChartScales & { id: string; title: string } {
    return {
      id: "water",
      title: "Water",
      position: "left",
      gridLines: {
        display: true,
      },
      ticks: {
        display: true,
        min: 0,
      },
      scaleLabel: {
        display: true,
        labelString: "Water (L)",
      },
    };
  }
}
