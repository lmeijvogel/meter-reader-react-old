export default class ArrayInterpolator {
  call(input) {
    const firstNonNull = this.firstNonNull(input);

    if (firstNonNull === -1) {
      // No elements are filled in!
      return input;
    }

    let rest;
    if (firstNonNull === 0) {
      // Fill a single range by finding the next non-null element and
      // interpolate between them

      // Skip the first element, but still count it in the offset
      const nextNonNull = this.firstNonNull(this.tail(input)) + 1;

      // No further elements are filled in, nothing to interpolate
      if (nextNonNull === 0) {
        return input;
      }

      const first = this.take(input, nextNonNull+1);
      rest  = this.drop(input, nextNonNull);

      const interpolatedFirst = this.interpolate(first);

      return this.initial(interpolatedFirst).concat(this.call(rest));
    } else {
      const nulls = this.take(input, firstNonNull);
      rest  = this.drop(input, firstNonNull);

      return nulls.concat(this.call(rest));
    }
  }

  interpolate(array) {
    const first = array[0];
    const last  = array[array.length-1];
    const count = array.length;

    const stepSize = (last - first) / (count - 1);

    return this.range(count).map( (el) => first + el*stepSize );
  }

  firstNonNull(input) {
    const firstIndexWhereInt = function(input, test) {
      if (input.length === 0) { return -1; }

      const head = input[0];

      if (test(head)) {
        return 0;
      } else {
        const indexInTail = firstIndexWhereInt(this.tail(input), test);

        if (indexInTail === -1) { return -1; }
        return 1 + indexInTail;
      }
    };

    return firstIndexWhereInt(input, (el) => el != null);
  }

  take(input, count) {
    return input.slice(0, count);
  }

  drop(input, count) {
    return input.slice(count);
  }

  tail(input) {
    return input.slice(1);
  }

  initial(input) {
    return input.slice(0, input.length - 1);
  }

  range(count) {
    let result = [];

    for (var i = 0 ; i < count ; i++ ) {
      result.push(i);
    }

    return result;
  }
};
