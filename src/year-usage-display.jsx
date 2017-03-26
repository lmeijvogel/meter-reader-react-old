import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class YearUsageDisplay extends PeriodUsageDisplay {
  labels() {
    var range = this.range(1, 13);

    return range;
  }

  positionInData(element, dataset) {
    const years = dataset.map( (el) => new Date(el.time_stamp).getFullYear() );
    const minYear = Math.min.apply(null, years);

    const date = new Date(element.time_stamp);

    return date.getMonth() + (date.getFullYear() - minYear) * 12;
  }

  tooltipLabel(month) {
    return "" + this.props.year + "-" + month;
  }

  onClick(index) {
    const newDate = new Date(this.props.year, index, 1);
    this.props.onSelect(newDate, "month");
  }
}
