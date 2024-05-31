export const valueFormatters = {
  rate: (value) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      style: "percent",
    }),
  whole: (value) => value.toLocaleString(),
};
