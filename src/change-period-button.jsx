import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

export default class ChangePeriodButton extends Component {
  render() {
    return <button onClick={this.onClick.bind(this)} disabled={!this.props.enabled} className={this.props.className}>{this.props.label}</button>;
  }

  onClick() {
    this.props.onClick();
  }
}
ChangePeriodButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,

  className: PropTypes.string
}
