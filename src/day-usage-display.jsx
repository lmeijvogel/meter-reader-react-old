import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class DayUsageDisplay extends PeriodUsageDisplay {
  labels() {
    return this.range(0, 24);
  }
}
