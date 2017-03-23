import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class DayUsageDisplay extends PeriodUsageDisplay {
  labels() {
    return this.range(0, 24);
  }

  tooltipLabel(hour) {
    const nextHour = (parseInt(hour, 10) + 1) % 24;
    return "" + hour + ":00 - " + nextHour + ":00";
  }

}
