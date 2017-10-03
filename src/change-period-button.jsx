import React from 'react';
import {Component} from 'react';

export default class ChangePeriodButton extends Component {
  render() {
    return <button onClick={this.onClick.bind(this)} disabled={!this.props.enabled} className={this.props.className}>{this.props.label}</button>;
  }

  onClick() {
    this.props.onClick(this.props.date, this.props.period);
  }
}
