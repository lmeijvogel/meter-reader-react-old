import ArrayInterpolator from '../src/array-interpolator';

const subject = new ArrayInterpolator();

describe('ArrayInterpolator', () => {
  describe("when the input is empty", () => {
    it("returns an empty array", () => {
      expect(subject.call([])).toHaveLength(0);
    });
  });

  describe("When there is an empty spot", () => {
    it("fills it", () => {
      const input = [1,2,null,null,5];

      expect(subject.call(input)).toEqual([1,2,3,4,5]);
    });
  });

  describe("When there is only one existing value", () => {
    it("does not try to interpolate anything", () => {
      const input = [ null, null, 2, null, null ];

      expect(subject.call(input)).toEqual([null, null, 2, null, null]);
    });
  });
});
