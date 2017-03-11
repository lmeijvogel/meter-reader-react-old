import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class YearUsageDisplay extends PeriodUsageDisplay {
  labels() {
    var range = this.range(1, 13);

    return range;
  }

  onClick(index) {
    const newDate = new Date(this.props.year, index, 1);
    this.props.onSelect(newDate, "month");
  }
}
