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
    const months = dataset.map( (el) => new Date(el.time_stamp).getMonth() );
    const minMonth = Math.min.apply(null, months);

    const date = new Date(element.time_stamp);

    const lastDayInMonth = new Date(date.getFullYear(), minMonth + 1, 0, 12, 0, 0);

    const maxDateInMonth = lastDayInMonth.getDate();

    return date.getDate() - 1 + (date.getMonth() - minMonth) * maxDateInMonth;
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
