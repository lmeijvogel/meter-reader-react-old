import * as React from 'react';
import {Component} from 'react';

interface IProps {
  enabled: boolean;
  label: string;

  onClick: () => void;

  className?: string
}

export default class ChangePeriodButton extends Component<IProps, {}> {
  render() {
    return <button onClick={this.onClick.bind(this)} disabled={!this.props.enabled} className={this.props.className}>{this.props.label}</button>;
  }

  onClick() {
    this.props.onClick();
  }
}
