const { isAdult } = require("./index");

describe('isAdult', () => {
  it('should return true for 21', () => {
    expect(isAdult(21)).toBe(true);
  });

  it('should return false for 12', () => {
    expect(isAdult(12)).toBe(false);
  });

  it('should return true for 18', () => {
    expect(isAdult(18)).toBe(true);
  });
});
