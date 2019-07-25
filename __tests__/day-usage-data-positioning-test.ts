import DayUsageDisplay from '../src/DayUsageDisplay.tsx';
import { DayDescription } from '../src/PeriodDescription';

describe("DayUsageDisplay data positioning", () => {
  var regularData = [
    {"time_stamp":"2017-04-30T00:12:55+02:00", position: 0},
    {"time_stamp":"2017-04-30T01:13:02+02:00", position: 1},
    {"time_stamp":"2017-04-30T02:13:09+02:00", position: 2},
    {"time_stamp":"2017-04-30T03:13:17+02:00", position: 3},
    {"time_stamp":"2017-04-30T04:13:24+02:00", position: 4},
    {"time_stamp":"2017-04-30T05:13:31+02:00", position: 5},
    {"time_stamp":"2017-04-30T06:13:38+02:00", position: 6},
    {"time_stamp":"2017-04-30T07:13:45+02:00", position: 7},
    {"time_stamp":"2017-04-30T08:13:53+02:00", position: 8},
    {"time_stamp":"2017-04-30T09:14:00+02:00", position: 9},
    {"time_stamp":"2017-04-30T10:14:07+02:00", position: 10},
    {"time_stamp":"2017-04-30T11:14:14+02:00", position: 11},
    {"time_stamp":"2017-04-30T12:14:22+02:00", position: 12},
    {"time_stamp":"2017-04-30T13:14:29+02:00", position: 13},
    {"time_stamp":"2017-04-30T14:14:36+02:00", position: 14},
    {"time_stamp":"2017-04-30T15:14:43+02:00", position: 15},
    {"time_stamp":"2017-04-30T16:14:50+02:00", position: 16},
    {"time_stamp":"2017-04-30T17:14:58+02:00", position: 17},
    {"time_stamp":"2017-04-30T18:00:03+02:00", position: 18},
    {"time_stamp":"2017-04-30T19:00:10+02:00", position: 19},
    {"time_stamp":"2017-04-30T20:00:17+02:00", position: 20},
    {"time_stamp":"2017-04-30T21:00:25+02:00", position: 21},
    {"time_stamp":"2017-04-30T22:00:32+02:00", position: 22},
    {"time_stamp":"2017-04-30T23:00:39+02:00", position: 23},
    {"time_stamp":"2017-05-01T00:00:46+02:00", position: 24}
  ]
  it("sets the correct order", () => {
    const dayUsageDisplay = new DayUsageDisplay({periodDescription: new DayDescription( 2017, 3, 30)});

    const result = regularData.map( (el) => dayUsageDisplay.positionInData(el, regularData) )

    expect(result).toEqual(regularData.map( (el) => el.position ) );
  });
});
