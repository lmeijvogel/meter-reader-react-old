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

  positionInData(element, dataset) {
    const date = new Date(element.time_stamp);
    const month = date.getMonth();

    const minMonth = new Date(dataset[0].time_stamp).getMonth();

    if (month === minMonth) {
      return date.getDate() - 1;
    } else {
      const lastDayInMonth = new Date(date.getFullYear(), minMonth + 1, 0, 12, 0, 0);

      return lastDayInMonth.getDate();
    }
  }

  maxDate() {
    // -1 because JS months are zero-based
    // +1 because we want the 0th day of the next month (== last day of current month)
    return (new Date(this.props.year, this.props.month - 1 + 1, 0)).getDate();
  }

  onClick(index) {
    const newPeriod = {
      period: "day",
      day: index + 1,
      month: this.props.month,
      year: this.props.year
    }

    this.props.onSelect(newPeriod);
  }

  maxGasY() {
    return 15;
  }

  maxStroomY() {
    return 15;
  }
}
