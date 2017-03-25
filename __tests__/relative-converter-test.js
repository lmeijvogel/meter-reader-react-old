import RelativeConverter from '../src/relative-converter';

const subject = new RelativeConverter();

describe("RelativeConverter", function() {
  describe("when the input is empty", function() {
    it("returns an empty array", function() {
      expect(subject.convert([]).length).toBe(0);
    });
  });

  describe("when the input contains values", function() {
    var input =    [10, 5, 16, 20];
    var expected = [-5, 11, 4];

    it("returns the differences", function() {
      expect(subject.convert(input)).toEqual(expected);
    });
  });
});
