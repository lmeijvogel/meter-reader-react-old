export default class LocationBarParser {
  parse(path) {
    const dayMatch = path.match(/\/day\/(\d+)\/(\d+)\/(\d+)/)

    if (dayMatch) {
      return {
        period: "day",
        day: parseInt(dayMatch[3], 10),
        month: parseInt(dayMatch[2], 10),
        year: parseInt(dayMatch[1], 10)
      }
    }

    const monthMatch = path.match(/\/month\/(\d+)\/(\d+)/)

    if (monthMatch) {
      return {
        period: "month",
        month: parseInt(monthMatch[2], 10),
        year: parseInt(monthMatch[1], 10)
      }
    }

    const yearMatch = path.match(/\/year\/(\d+)/)

    if (yearMatch) {
      return {
        period: "year",
        year: parseInt(yearMatch[1], 10)
      }
    }

    const date = new Date()

    return {
      period: "month",
      month: date.getMonth() + 1,
      year: date.getYear()
    }
  }
}
