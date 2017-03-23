import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class MonthUsageDisplay extends PeriodUsageDisplay {
  labels() {
    var range = this.range(1, this.maxDate()+1);

    return range;
  }

  tooltipLabel(day) {
    return "" + this.props.year + "-" + this.props.month + "-" + day;
  }

  maxDate() {
    // -1 because JS months are zero-based
    // +1 because we want the 0th day of the next month (== last day of current month)
    return (new Date(this.props.year, this.props.month - 1 + 1, 0)).getDate();
  }

  onClick(index) {
    const newDate = new Date(this.props.year, this.props.month - 1, index + 1);
    this.props.onSelect(newDate, "day");
  }
}
