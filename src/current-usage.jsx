import React from 'react';
import {Component} from 'react';

import PropTypes from 'prop-types';

export default class CurrentUsage extends Component {
  render() {
    return (
      <table className="column column-20">
        <thead>
          <tr>
            <th>Current</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={this.className()}>{this.displayableCurrent()}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  className() {
    return "";
  }

  displayableCurrent() {
    if (this.props.current) {
      return "" + (this.props.current * 1000) + " W";
    } else {
      return "...";
    }
  }
}

CurrentUsage.propTypes = {
  current: PropTypes.number
}
