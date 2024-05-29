import { CSVToArray } from "./CSVToArray";
import { isNumeric } from "./isNumeric";

export const CSVTo2DArray = (csvText) => {
  const array = CSVToArray(csvText);

  const headers = array[0];

  const rows = array
    .slice(1)
    .map((values) =>
      Object.fromEntries(
        values.map((value, index) => [
          headers[index],
          isNumeric(value) ? Number(value) : value,
        ])
      )
    );

  return rows;
};
