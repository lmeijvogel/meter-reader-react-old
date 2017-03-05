import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

export default class DayUsageDisplay extends PeriodUsageDisplay {
  labels() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  }
}
