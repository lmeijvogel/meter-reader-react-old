const DAYS_OF_WEEK = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
}

export abstract class PeriodDescription {
  padDatePart(part: number): string {
    const stringPart = part.toString();

    switch(stringPart.length) {
      case 0:
        return '00';
      case 1:
        return '0'+stringPart;
      default:
        return stringPart;
    }
  }

  abstract toUrl(): string;
  abstract toTitle(): string;
}

export class YearDescription extends PeriodDescription {
  year: number;

  constructor(year: number) {
    super()
    this.year = year;
  }

  previous() {
    return new YearDescription(this.year - 1);
  }

  next() {
    return new YearDescription(this.year + 1);
  }

  toUrl() {
    return '/year/'+ this.year;
  }

  toTitle() {
    return this.year.toString();
  }
}

export class MonthDescription extends PeriodDescription {
  year: number;
  month: number;

  constructor(year: number, month: number) {
    super()
    this.year = year;
    this.month = month;
  }

  previous() {
    const date = new Date(this.year, this.month - 1, 1);

    return new MonthDescription(date.getFullYear(), date.getMonth());
  }

  next() {
    const date = new Date(this.year, this.month + 1, 1);

    return new MonthDescription(date.getFullYear(), date.getMonth());
  }

  up() {
    return new YearDescription(this.year);
  }

  toUrl() {
    return '/month/'+ this.year + '/' + this.padDatePart(this.month + 1);
  }

  toTitle() {
    return `${this.year}-${this.padDatePart(this.month + 1)}`
  }
}

export class DayDescription extends PeriodDescription {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    super()
    this.year = year;
    this.month = month;
    this.day = day;
  }

  previous() {
    const date = new Date(this.year, this.month, this.day - 1)

    return new DayDescription(date.getFullYear(), date.getMonth(), date.getDate());
  }

  next() {
    const date = new Date(this.year, this.month, this.day + 1)
    return new DayDescription(date.getFullYear(), date.getMonth(), date.getDate());
  }

  up() {
    return new MonthDescription(this.year, this.month);
  }

  toUrl() {
    return '/day/'+ this.year + '/' + this.padDatePart(this.month + 1) + '/'+ this.padDatePart(this.day);
  }

  toTitle() {
    const date = new Date(this.year, this.month, this.day);

    return `${DAYS_OF_WEEK[date.getDay()]} ${this.year}-${this.month + 1}-${this.day}`
  }

  static today() {
    const now = new Date();

    return new DayDescription(now.getFullYear(), now.getMonth(), now.getDate());
  }
}
