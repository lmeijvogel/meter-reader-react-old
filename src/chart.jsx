import React from 'react';
import {Component} from 'react';

import {Bar} from 'react-chartjs-2';

import ArrayInterpolator from './array-interpolator.js';
import RelativeConverter from './relative-converter.js';

export default class Chart extends Component {

  render() {
    var tooltipLabelBuilder = this.props.tooltipLabelBuilder;

    var titleCallback = function (tooltipItems, data) {
      // Pick first xLabel for now
      var title = '';
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
      title: { display: true,
               text: this.chartTitle()
      },
      legend: { display: false },
      tooltips: { callbacks: { title: titleCallback } },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  max: this.props.maxY
              }
          }]
      }
    };
    // Apparently, Chart.js doesn't understand 'height' and 'maxHeight' correctly, but only handles 'width' and 'max-width'.
    // The maxWidth here corresponds to filling a single screen (vertically) on my laptop.
    return (
      <div>
        <Bar data={this.chartData()} options={options} />
      </div>
    );
  }

  chartData() {
    const interpolatedData = new ArrayInterpolator().call(this.dataForField());
    const relativeData = new RelativeConverter().convert(interpolatedData);
    const roundedData = relativeData.map( (value) => this.truncate(value, 3) );

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

  chartTitle() {
    return "" + this.props.label + " (" + this.printableTotal() + " " + this.unit() + ")";
  }

  printableTotal() {
    const total = this.max() - this.min();
    return this.truncate(total, 3);
  }

  max() {
    return Math.max.apply(null, this.dataForField());
  }

  min() {
    return Math.min.apply(null, this.dataForField());
  }

  truncate(value, precision) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }

  dataForField() {
    return this.props.data.map( (u) => {
      if (u) {
        return u[this.props.fieldName]
      } else {
        return null;
      }
    });
  }

  unit() {
    switch (this.props.fieldName) {
      case 'gas':
        return "m³";
        break;
      case 'stroom_totaal':
        return "kWh";
        break;
    }
  }


  onClick(event, data) {
    if (data[0]) {
      this.props.onClick(data[0]._index);
    }
  }
}
