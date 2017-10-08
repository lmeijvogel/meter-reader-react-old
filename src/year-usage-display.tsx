import * as React from 'react';

import PeriodUsageDisplay from './period-usage-display';
import { IPeriodUsageDisplayProps } from './period-usage-display';

interface IProps extends IPeriodUsageDisplayProps {
  year: number;
}

export default class YearUsageDisplay extends PeriodUsageDisplay<IProps, {}> {
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
    const newPeriod = {
      period: "month",
      year: this.props.year,
      month: index + 1
    };

    this.props.onSelect(newPeriod);
  }

  maxGasY() {
    return 300;
  }

  maxStroomY() {
    return 350;
  }
}
