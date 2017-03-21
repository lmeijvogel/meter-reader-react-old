import React from 'react';
import {Component} from 'react';

export default class ActualReadings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <table className="numeric-data">
        <thead>
        <tr>
          <th>Meterstand stroom dal(kWh)</th>
          <th>Meterstand stroom piek(kWh)</th>
          <th>Meterstand gas (m<sup>3</sup>)</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{this.props.stroom_dal}</td>
          <td>{this.props.stroom_piek}</td>
          <td>{this.props.gas}</td>
        </tr>
        </tbody>
      </table>
    );
  }
}

