import * as React from "react";
import { Component } from "react";

interface IProps {
    enabled: boolean;
    label: string;

    onClick: () => void;
}

export default class NavigationButton extends Component<IProps, {}> {
    render() {
        return (
            <button onClick={this.onClick.bind(this)} disabled={!this.props.enabled} className="navigation-button">
                {this.props.label}
            </button>
        );
    }

    onClick() {
        this.props.onClick();
    }
}
