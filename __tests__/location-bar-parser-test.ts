import LocationBarParser from '../src/LocationBarParser';
import { PeriodDescription, YearDescription, MonthDescription, DayDescription } from '../src/PeriodDescription';

describe("LocationBarParser", () => {
  let locationBarParser;

  beforeEach(() => {
    locationBarParser = new LocationBarParser();
  })

  describe("when the path is /", () => {
    it("returns the current month", () => {
      const actual = locationBarParser.parse("/")

      expect(actual).toEqual(new MonthDescription(
        (new Date()).getFullYear(),
        (new Date()).getMonth()
      ))
    })
  })

  describe("when the path is /day/2017/06/20", () => {
    it("returns the correct day", () => {
      const actual = locationBarParser.parse("/day/2017/06/20")

      expect(actual).toEqual(new DayDescription(2017, 5, 20))
    })
  })

  describe("when the path is /month/2017/06", () => {
    it("returns the correct month", () => {
      const actual = locationBarParser.parse("/month/2017/06")

      expect(actual).toEqual(new MonthDescription(2017, 5))
    })
  })

  describe("when the path is /year/2017", () => {
    it("returns the correct year", () => {
      const actual = locationBarParser.parse("/year/2017")

      expect(actual).toEqual(new YearDescription(2017))
    })
  })
})

