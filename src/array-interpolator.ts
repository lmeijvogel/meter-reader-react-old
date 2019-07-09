export class ArrayInterpolator {
    call(input: (number | null)[]): number[] {
        const firstNonEmptyIndex: number = this.firstNonEmptyIndex(input);

        if (firstNonEmptyIndex === -1) {
            // No elements are filled in!
            return [];
        }

        let rest: number[];

        if (firstNonEmptyIndex === 0) {
            // Fill a single range by finding the next non-empty element and
            // interpolate between them

            // Skip the first element, but still count it in the offset
            const nextNonEmpty = this.firstNonEmptyIndex(this.tail(input)) + 1;

            // No further elements are filled in, nothing to interpolate
            if (nextNonEmpty === 0) {
                return input.slice(0, 1) as number[];
            }

            const first: number[] = this.take(input, nextNonEmpty + 1);
            rest = this.drop(input, nextNonEmpty);

            const interpolatedFirst = this.interpolate(first);

            return this.initial(interpolatedFirst).concat(this.call(rest));
        } else {
            const empties: number[] = this.take(input, firstNonEmptyIndex);
            rest = this.drop(input, firstNonEmptyIndex);

            return empties.concat(this.call(rest));
        }
    }

    interpolate(array: number[]): number[] {
        const first = array[0];
        const last = array[array.length - 1];
        const count = array.length;

        const stepSize = (last - first) / (count - 1);

        return this.range(count).map(el => first + el * stepSize);
    }

    firstNonEmptyIndex(input: (number | null)[]): number {
        const firstIndexWhereInt = (input, test) => {
            if (input.length === 0) {
                return -1;
            }

            const head = input[0];

            if (test(head)) {
                return 0;
            } else {
                const indexInTail = firstIndexWhereInt(this.tail(input), test);

                if (indexInTail === -1) {
                    return -1;
                }
                return 1 + indexInTail;
            }
        };

        return firstIndexWhereInt(input, el => el != 0 && el != null);
    }

    take(input: any[], count: number) {
        return input.slice(0, count);
    }

    drop(input: any[], count: number) {
        return input.slice(count);
    }

    tail(input: any[]): any[] {
        return input.slice(1);
    }

    initial(input: any[]): any[] {
        return input.slice(0, input.length - 1);
    }

    range(count: number): number[] {
        let result: number[] = [];

        for (let i: number = 0; i < count; i++) {
            result.push(i);
        }

        return result;
    }
}
