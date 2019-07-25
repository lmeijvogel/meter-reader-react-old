import DataShifter from '../src/DataShifter';

describe("DataShifter", () => {
  const subject = new DataShifter();

  describe("when the input is empty", () => {
    it("returns an empty array", () => {
      expect(subject.call([])).toEqual([]);
    });
  });

  describe("when the input does not have to be shifted", () => {
    it("returns the original array", () => {
      const input = [{pos: 0}, {pos: 1}];

      expect(subject.call(input, posExtractor)).toEqual(input);
    });
  });

  describe("when the input has to be shifted", () => {
    it("returns the shifted array", () => {
      const input = [{pos: 3}, {pos: 5}];
      const expected = [null, null, null, {pos: 3}, null, {pos: 5}];

      expect(subject.call(input, posExtractor)).toEqual(expected);
    });
  });

  describe("when the input is invalid", () => {
    it("throws an error", () => {
      const wrongOrderInput = [{pos: 6}, {pos: 5}];

      expect( () => {
        subject.call(wrongOrderInput, posExtractor);
      }).toThrowError();

      const duplicatePositionInput = [{pos: 2}, {pos: 2}];

      expect( () => {
        subject.call(duplicatePositionInput, posExtractor);
      }).toThrowError();
    });
  });
});

function posExtractor(element) {
  return element.pos;
}
