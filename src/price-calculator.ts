export enum PriceCategory {
    Gas,
        Stroom,
        Water
}

export class Money {
    constructor(private readonly cents: number) {}

    multiply(amount: number): Money {
        return new Money(this.cents * amount);
    }

    toString(): string {
        return `€ ${(this.cents / 100).toFixed(2)}`;
    }
}

type RateForDateRange = {
    gasPrice: Money;
    stroomPrice: Money;
    waterPrice: Money;
    validFrom: Date;
    validUntil: Date;
};

export namespace PriceCalculator {
    // Since new rates are added only once every two years,
    // I think the effort of building a frontend for managing these
    // rates won't be worth the effort :D
    //
    // All rates are in given in euros, but our Money class wants cents.
    const prices: RateForDateRange[] = [
        {
            gasPrice: new Money(0.267 * 100),
            stroomPrice: new Money(0.047 * 100),
            waterPrice: new Money(0),
            validFrom: new Date(2014, 0, 1),
            validUntil: new Date(2018, 10, 11)
        },
        {
            gasPrice: new Money(0.75336 * 100),
            stroomPrice: new Money(0.22652 * 100),
            waterPrice: new Money(1.30037 * 100 / 1000), // Incl. BTW, 1.193 excl. BTW. Rate is given on the Evides website in euros/m3, but I'd like to show in liters, so divide by 1000
            validFrom: new Date(2018, 10, 12),
            validUntil: new Date(2019, 10, 11)
        }
    ];

    export function costsFor(units: number, priceCategory: PriceCategory, date: Date): Money {
        const currentRate = rateForDate(date);

        switch (priceCategory) {
            case PriceCategory.Gas:
                return currentRate.gasPrice.multiply(units);
            case PriceCategory.Stroom:
                return currentRate.stroomPrice.multiply(units);
            case PriceCategory.Water:
                return currentRate.waterPrice.multiply(units);
        }
    }

    function rateForDate(date: Date): RateForDateRange {
        const result = prices.filter(price => price.validFrom <= date && date < price.validUntil);

        if (result.length === 0) {
            console.error("No prices specified for the selected date");
            return {
                gasPrice: new Money(0),
                stroomPrice: new Money(0),
                waterPrice: new Money(0),
                validFrom: new Date(2014, 0, 1),
                validUntil: new Date(2038, 0, 1)
            };
        }

        return result[0];
    }
}
