import { getBaseLog } from "./getBaseLog";

export const getDomain = (values, base = 5) => {
  const [min, max] = [Math.min(...values), Math.max(...values)];

  const spread = max - min;

  const [lower, upper] = [min - spread > 0 ? min - spread : 0, max];

  const power = Math.floor(getBaseLog(base, spread));

  const multiple = Math.pow(base, power);

  const domain = [
    Math.floor(lower / multiple) * multiple,
    Math.ceil(upper / multiple) * multiple,
  ];

  return domain;
};
