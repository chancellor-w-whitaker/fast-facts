export const normalizeValue = (value, lowerBound, upperBound) =>
  (value - lowerBound) / (upperBound - lowerBound);
