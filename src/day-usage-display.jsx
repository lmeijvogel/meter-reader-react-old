import React from 'react';

import PeriodUsageDisplay from './period-usage-display.jsx';

import PropTypes from 'prop-types';

export default class DayUsageDisplay extends PeriodUsageDisplay {
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

DayUsageDisplay.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired
}
