import MonthUsageDisplay from '../src/month-usage-display.jsx';

describe("MonthUsageDisplay data positioning", () => {
  var regularData = [
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
  it("sets the correct order", () => {
    const monthUsageDisplay = new MonthUsageDisplay();

    const result = regularData.map( (el) => monthUsageDisplay.positionInData(el, regularData) )

    expect(result).toEqual(regularData.map( (el) => el.position ) );
  });

  describe("the last month of the year", () => {
    let data = [
      {"time_stamp":"2014-12-01T00:00:09+01:00","position":  0},
      {"time_stamp":"2014-12-02T00:00:01+01:00","position":  1},
      {"time_stamp":"2014-12-03T00:00:04+01:00","position":  2},
      {"time_stamp":"2014-12-04T00:00:07+01:00","position":  3},
      {"time_stamp":"2014-12-05T00:00:00+01:00","position":  4},
      {"time_stamp":"2014-12-06T00:00:03+01:00","position":  5},
      {"time_stamp":"2014-12-07T00:00:06+01:00","position":  6},
      {"time_stamp":"2014-12-08T00:00:09+01:00","position":  7},
      {"time_stamp":"2014-12-09T00:00:03+01:00","position":  8},
      {"time_stamp":"2014-12-10T00:00:06+01:00","position":  9},
      {"time_stamp":"2014-12-11T00:00:09+01:00","position": 10},
      {"time_stamp":"2014-12-12T00:00:02+01:00","position": 11},
      {"time_stamp":"2014-12-13T00:00:06+01:00","position": 12},
      {"time_stamp":"2014-12-14T00:00:09+01:00","position": 13},
      {"time_stamp":"2014-12-15T00:00:02+01:00","position": 14},
      {"time_stamp":"2014-12-16T00:00:06+01:00","position": 15},
      {"time_stamp":"2014-12-17T00:00:09+01:00","position": 16},
      {"time_stamp":"2014-12-18T00:00:02+01:00","position": 17},
      {"time_stamp":"2014-12-19T00:00:05+01:00","position": 18},
      {"time_stamp":"2014-12-20T00:00:08+01:00","position": 19},
      {"time_stamp":"2014-12-21T00:00:01+01:00","position": 20},
      {"time_stamp":"2014-12-22T00:00:04+01:00","position": 21},
      {"time_stamp":"2014-12-23T00:00:08+01:00","position": 22},
      {"time_stamp":"2014-12-24T00:00:01+01:00","position": 23},
      {"time_stamp":"2014-12-25T00:00:04+01:00","position": 24},
      {"time_stamp":"2014-12-26T00:00:07+01:00","position": 25},
      {"time_stamp":"2014-12-27T00:00:01+01:00","position": 26},
      {"time_stamp":"2014-12-28T00:00:04+01:00","position": 27},
      {"time_stamp":"2014-12-29T00:00:07+01:00","position": 28},
      {"time_stamp":"2014-12-30T00:00:00+01:00","position": 29},
      {"time_stamp":"2014-12-31T00:00:00+01:00","position": 30},
      {"time_stamp":"2015-01-01T00:00:04+01:00","position": 31}
    ];

    data = [
      {"time_stamp":"2016-12-01T00:12:24+01:00","position": 0},
      {"time_stamp":"2016-12-02T00:00:15+01:00","position": 1},
      {"time_stamp":"2016-12-03T00:03:08+01:00","position": 2},
      {"time_stamp":"2016-12-04T00:06:02+01:00","position": 3},
      {"time_stamp":"2016-12-05T00:08:55+01:00","position": 4},
      {"time_stamp":"2016-12-06T00:11:48+01:00","position": 5},
      {"time_stamp":"2016-12-07T00:14:41+01:00","position": 6},
      {"time_stamp":"2016-12-08T00:02:33+01:00","position": 7},
      {"time_stamp":"2016-12-09T00:05:26+01:00","position": 8},
      {"time_stamp":"2016-12-10T00:08:19+01:00","position": 9},
      {"time_stamp":"2016-12-11T00:11:13+01:00","position": 10},
      {"time_stamp":"2016-12-12T00:14:06+01:00","position": 11},
      {"time_stamp":"2016-12-13T00:01:57+01:00","position": 12},
      {"time_stamp":"2016-12-14T00:04:51+01:00","position": 13},
      {"time_stamp":"2016-12-15T00:07:44+01:00","position": 14},
      {"time_stamp":"2016-12-16T00:10:37+01:00","position": 15},
      {"time_stamp":"2016-12-17T00:13:31+01:00","position": 16},
      {"time_stamp":"2016-12-18T00:01:22+01:00","position": 17},
      {"time_stamp":"2016-12-19T00:04:15+01:00","position": 18},
      {"time_stamp":"2016-12-20T00:07:09+01:00","position": 19},
      {"time_stamp":"2016-12-21T00:10:02+01:00","position": 20},
      {"time_stamp":"2016-12-22T00:12:55+01:00","position": 21},
      {"time_stamp":"2016-12-23T00:00:47+01:00","position": 22},
      {"time_stamp":"2016-12-24T00:03:40+01:00","position": 23},
      {"time_stamp":"2016-12-25T00:06:33+01:00","position": 24},
      {"time_stamp":"2016-12-26T00:09:26+01:00","position": 25},
      {"time_stamp":"2016-12-27T00:12:20+01:00","position": 26},
      {"time_stamp":"2016-12-28T00:00:11+01:00","position": 27},
      {"time_stamp":"2016-12-29T00:03:05+01:00","position": 28},
      {"time_stamp":"2016-12-30T00:05:58+01:00","position": 29},
      {"time_stamp":"2016-12-31T00:08:51+01:00","position": 30},
      {"time_stamp":"2017-01-01T00:11:44+01:00","position": 31}
    ]

    it("handles it correctly", () => {
      const monthUsageDisplay = new MonthUsageDisplay();

      const result = data.map( (el) => monthUsageDisplay.positionInData(el, data) )

      expect(result).toEqual(data.map( (el) => el.position ) );
    });
  });
});
