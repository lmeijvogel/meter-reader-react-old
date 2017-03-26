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

  positionInData(element, dataset) {
    const days = dataset.map( (el) => new Date(el.time_stamp).getDate() );
    const minDate = Math.min.apply(null, days);

    const date = new Date(element.time_stamp);

    return date.getHours() + (date.getDate() - minDate) * 24;
  }

}
