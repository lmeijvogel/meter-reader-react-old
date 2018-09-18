import * as React from "react";
import { Component } from "react";

interface IProps {
    id: number;
    current: number;
}

export class CurrentUsage extends Component<IProps, any> {
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
                        <td>{this.displayableCurrent()}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    displayableCurrent(): string {
        if (this.props.current) {
            return "" + this.props.current * 1000 + " W";
        } else {
            return "...";
        }
    }
}
