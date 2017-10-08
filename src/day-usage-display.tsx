import * as React from 'react';

import PeriodUsageDisplay from './period-usage-display';
import { IPeriodUsageDisplayProps } from './period-usage-display';

interface IProps extends IPeriodUsageDisplayProps {
  year: number;
  month: number;
  day: number;
}

export default class DayUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
  labels() {
    return this.range(0, 24);
  }

  tooltipLabel(hour) {
    const nextHour = (parseInt(hour, 10) + 1) % 24;
    return "" + hour + ":00 - " + nextHour + ":00";
  }

  positionInData(element, dataset) {
    const currentDate = new Date(this.props.year, this.props.month - 1, this.props.day);

    const elementTime = new Date(element.time_stamp);
    const elementDate = new Date(elementTime.getFullYear(), elementTime.getMonth(), elementTime.getDate());

    const oneDay = 24*60*60*1000;
    const dayDifference = (elementDate.getTime() - currentDate.getTime()) / oneDay;

    return elementTime.getHours() + dayDifference * 24;
  }

  maxGasY() {
    return 2;
  }

  maxStroomY() {
    return 1.5;
  }
}
