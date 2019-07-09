import * as React from "react";
import { Component } from "react";

type LiveData = {
    id: number;
    current: number;
};

type IProps = {
    liveData: LiveData | null;
};

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
                        <td>{this.displayableCurrent}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    private get displayableCurrent(): string {
        const { liveData } = this.props;

        if (liveData) {
            return `${liveData.current * 1000} W`;
        } else {
            return "...";
        }
    }
}
