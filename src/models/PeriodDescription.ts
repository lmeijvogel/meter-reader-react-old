const DAYS_OF_WEEK = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag",
];

const MONTHS = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
];

const firstMeasurementDate = new Date(2014, 2, 3);

export abstract class PeriodDescription {
    padDatePart(part: number): string {
        const stringPart = part.toString();

        switch (stringPart.length) {
            case 0:
                return "00";
            case 1:
                return "0" + stringPart;
            default:
                return stringPart;
        }
    }

    abstract toUrl(): string;
    abstract toTitle(): string;
    abstract toDate(): Date;

    abstract previous(): PeriodDescription;
    abstract next(): PeriodDescription;
    abstract up(): PeriodDescription | null;

    hasMeasurements(): boolean {
        return !this.beforeFirstMeasurement() && !this.isInFuture();
    }

    beforeFirstMeasurement(): boolean {
        return this.relevantDateParts(this.toDate()) < this.relevantDateParts(firstMeasurementDate);
    }

    abstract relevantDateParts(date: Date): Date;

    isInFuture(): boolean {
        return this.toDate() > new Date();
    }

    toShortTitle(): string {
        return this.toTitle();
    }
}

export class YearDescription extends PeriodDescription {
    year: number;

    constructor(year: number) {
        super();
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
        return "/year/" + this.year;
    }

    toTitle() {
        return this.year.toString();
    }

    toDate() {
        return new Date(this.year, 0, 1);
    }

    relevantDateParts(date: Date): Date {
        return new Date(date.getFullYear(), 0, 0);
    }
}

export class MonthDescription extends PeriodDescription {
    year: number;
    month: number;

    constructor(year: number, month: number) {
        super();
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
        return "/month/" + this.year + "/" + this.padDatePart(this.month + 1);
    }

    toTitle() {
        return `${MONTHS[this.month]} ${this.year}`;
    }

    toDate() {
        return new Date(this.year, this.month, 1);
    }

    relevantDateParts(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 0);
    }
}

export class DayDescription extends PeriodDescription {
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        super();
        this.year = year;
        this.month = month;
        this.day = day;
    }

    previous() {
        const date = new Date(this.year, this.month, this.day - 1);

        return new DayDescription(date.getFullYear(), date.getMonth(), date.getDate());
    }

    next() {
        const date = new Date(this.year, this.month, this.day + 1);
        return new DayDescription(date.getFullYear(), date.getMonth(), date.getDate());
    }

    up() {
        return new MonthDescription(this.year, this.month);
    }

    toUrl() {
        return "/day/" + this.year + "/" + this.padDatePart(this.month + 1) + "/" + this.padDatePart(this.day);
    }

    toTitle() {
        const date = new Date(this.year, this.month, this.day);

        return `${DAYS_OF_WEEK[date.getDay()]} ${this.day} ${MONTHS[this.month]} ${this.year}`;
    }

    toDate() {
        return new Date(this.year, this.month, this.day);
    }

    toShortTitle() {
        return `${this.day} ${MONTHS[this.month]} ${this.year}`;
    }

    relevantDateParts(date: Date): Date {
        return date;
    }

    static today() {
        const now = new Date();

        return new DayDescription(now.getFullYear(), now.getMonth(), now.getDate());
    }
}
