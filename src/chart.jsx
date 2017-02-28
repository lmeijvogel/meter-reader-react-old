import React from 'react';
import {Component} from 'react';

import {Bar} from 'react-chartjs-2';

import ArrayInterpolator from './array-interpolator.js';
import RelativeConverter from './relative-converter.js';

export default class Chart extends Component {

  render() {
    return <Bar data={this.data()} />
  }

  data() {
    const data = this.props.data.map( (u) => u[this.props.fieldName] );

    const interpolatedData = new ArrayInterpolator().call(data);
    const relativeData = new RelativeConverter().convert(interpolatedData);

    return {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.label,
          data: relativeData,
          borderColor: this.props.color,
          backgroundColor: this.props.color
        }
      ]
    };
  }
}
