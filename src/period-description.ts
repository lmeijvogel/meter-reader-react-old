const DAYS_OF_WEEK = {
  0: "Zondag",
  1: "Maandag",
  2: "Dinsdag",
  3: "Woensdag",
  4: "Donderdag",
  5: "Vrijdag",
  6: "Zaterdag"
}

const MONTHS = {
  0: "januari",
  1: "februari",
  2: "maart",
  3: "april",
  4: "mei",
  5: "juni",
  6: "juli",
  7: "augustus",
  8: "september",
  9: "oktober",
  10: "november",
  11: "december"
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

  abstract previous() : PeriodDescription;
  abstract next() : PeriodDescription;
  abstract up() : PeriodDescription | null;

  toShortTitle() : string {
    return this.toTitle();
  }
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

  up() {
    return null;
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
    return `${MONTHS[this.month]} ${this.year}`;
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

    return `${DAYS_OF_WEEK[date.getDay()]} ${this.day} ${MONTHS[this.month]} ${this.year}`;
  }

  toShortTitle() {
    const date = new Date(this.year, this.month, this.day);

    return `${this.day} ${MONTHS[this.month]} ${this.year}`;
  }

  static today() {
    const now = new Date();

    return new DayDescription(now.getFullYear(), now.getMonth(), now.getDate());
  }
}
