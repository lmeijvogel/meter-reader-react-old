import LocationBarParser from '../src/location-bar-parser.js';

describe("LocationBarParser", () => {
  let locationBarParser;

  beforeEach(() => {
    locationBarParser = new LocationBarParser();
  })

  describe("when the path is /", () => {
    it("returns the current month", () => {
      const actual = locationBarParser.parse("/")

      expect(actual).toEqual({
        period: "month",
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getYear()
      })
    })
  })

  describe("when the path is /day/2017/06/20", () => {
    it("returns the correct day", () => {
      const actual = locationBarParser.parse("/day/2017/06/20")

      expect(actual).toEqual({
        period: "day",
        day: 20,
        month: 6,
        year: 2017
      })
    })
  })

  describe("when the path is /month/2017/06", () => {
    it("returns the correct month", () => {
      const actual = locationBarParser.parse("/month/2017/06")

      expect(actual).toEqual({
        period: "month",
        month: 6,
        year: 2017
      })
    })
  })

  describe("when the path is /year/2017", () => {
    it("returns the correct year", () => {
      const actual = locationBarParser.parse("/year/2017")

      expect(actual).toEqual({
        period: "year",
        year: 2017
      })
    })
  })
})

