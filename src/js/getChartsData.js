import { CSVTo2DArray } from "./CSVTo2DArray";
import { dataTypes } from "./dataTypes";
import { dataKeys } from "./dataKeys";

export const getChartsData = (csvText) => {
  const rows = CSVTo2DArray(csvText);

  const container = {};

  rows.forEach((row) => {
    const group = row[dataKeys.groupBy];

    if (!(group in container)) {
      container[group] = [];
    }

    container[group].push(row);
  });

  const result = Object.entries(container)
    .map(([id, data]) => ({ title: dataTypes[id]?.title, data, id }))
    .filter(({ title }) => title !== undefined);

  return result;
};
