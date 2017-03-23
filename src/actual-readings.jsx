import React from 'react';
import {Component} from 'react';

export default class ActualReadings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {stroom_dal, stroom_piek, gas} = this.props;

    return (
      <div>
        <h3>Meterstanden</h3>

        <table className="numeric-data">
          <thead>
          <tr>
            <th>Dal (kWh)</th>
            <th>Piek (kWh)</th>
            <th>Gas (m<sup>3</sup>)</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{stroom_dal}</td>
            <td>{stroom_piek}</td>
            <td>{gas}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

