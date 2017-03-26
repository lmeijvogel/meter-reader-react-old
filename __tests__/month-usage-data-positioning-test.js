import MonthUsageDisplay from '../src/month-usage-display.jsx';

var data = [
  {"time_stamp":"2014-06-01T00:00:09+02:00","position":  0},
  {"time_stamp":"2014-06-02T00:00:01+02:00","position":  1},
  {"time_stamp":"2014-06-03T00:00:04+02:00","position":  2},
  {"time_stamp":"2014-06-04T00:00:07+02:00","position":  3},
  {"time_stamp":"2014-06-05T00:00:00+02:00","position":  4},
  {"time_stamp":"2014-06-06T00:00:03+02:00","position":  5},
  {"time_stamp":"2014-06-07T00:00:06+02:00","position":  6},
  {"time_stamp":"2014-06-08T00:00:09+02:00","position":  7},
  {"time_stamp":"2014-06-09T00:00:03+02:00","position":  8},
  {"time_stamp":"2014-06-10T00:00:06+02:00","position":  9},
  {"time_stamp":"2014-06-11T00:00:09+02:00","position": 10},
  {"time_stamp":"2014-06-12T00:00:02+02:00","position": 11},
  {"time_stamp":"2014-06-13T00:00:06+02:00","position": 12},
  {"time_stamp":"2014-06-14T00:00:09+02:00","position": 13},
  {"time_stamp":"2014-06-15T00:00:02+02:00","position": 14},
  {"time_stamp":"2014-06-16T00:00:06+02:00","position": 15},
  {"time_stamp":"2014-06-17T00:00:09+02:00","position": 16},
  {"time_stamp":"2014-06-18T00:00:02+02:00","position": 17},
  {"time_stamp":"2014-06-19T00:00:05+02:00","position": 18},
  {"time_stamp":"2014-06-20T00:00:08+02:00","position": 19},
  {"time_stamp":"2014-06-21T00:00:01+02:00","position": 20},
  {"time_stamp":"2014-06-22T00:00:04+02:00","position": 21},
  {"time_stamp":"2014-06-23T00:00:08+02:00","position": 22},
  {"time_stamp":"2014-06-24T00:00:01+02:00","position": 23},
  {"time_stamp":"2014-06-25T00:00:04+02:00","position": 24},
  {"time_stamp":"2014-06-26T00:00:07+02:00","position": 25},
  {"time_stamp":"2014-06-27T00:00:01+02:00","position": 26},
  {"time_stamp":"2014-06-28T00:00:04+02:00","position": 27},
  {"time_stamp":"2014-06-29T00:00:07+02:00","position": 28},
  {"time_stamp":"2014-06-30T00:00:00+02:00","position": 29},
  {"time_stamp":"2014-07-01T00:00:04+02:00","position": 30}
]
describe("MonthUsageDisplay data positioning", () => {
  it("sets the correct order", () => {
    const monthUsageDisplay = new MonthUsageDisplay();

    const result = data.map( (el) => monthUsageDisplay.positionInData(el, data) )

    expect(result).toEqual(data.map( (el) => el.position ) );
  });
});
