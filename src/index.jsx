import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

import Chart from './chart.jsx';

class PeriodUsageDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    return (
      <div>
        <Chart label="Gas" labels={labels} data={this.props.usage} fieldName="gas" color="#f0ad4e"></Chart>
        <Chart label="Stroom" labels={labels} data={this.props.usage} fieldName="stroom_totaal" color="#428bca"></Chart>
      </div>
    );
  }
}

class CountDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {periodUsage: []};
  }

  componentDidMount() {
    fetch('/data.json').then( (response) => response.json()).then( (json) => {
      this.setState({periodUsage: json});
    });
  }

  render() {
    return (
      <div>
        <PeriodUsageDisplay usage={this.state.periodUsage} />
      </div>
    )
  }
}

const appContainer = document.querySelector(".app-container");

ReactDOM.render(<CountDisplay />, appContainer);
