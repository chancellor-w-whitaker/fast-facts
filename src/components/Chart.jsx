import {
  ResponsiveContainer,
  LabelList,
  BarChart,
  YAxis,
  XAxis,
  Cell,
  Bar,
} from "recharts";
import { useCallback, useState } from "react";

export const Chart = ({
  valueFormatter,
  xAxisDataKey,
  height = 300,
  barDataKey,
  barLabel,
  data,
}) => {
  const [mouseOverPayload, setMouseOverPayload] = useState({});

  const onMouseOverBar = useCallback(
    ({ payload }) => setMouseOverPayload(payload),
    []
  );

  const onMouseOutBar = useCallback(() => setMouseOverPayload({}), []);

  const topLabelValueAccessor = useCallback(
    ({ [xAxisDataKey]: xAxisValue, payload }) => {
      if (mouseOverPayload === payload) {
        return xAxisValue;
      }
    },
    [xAxisDataKey, mouseOverPayload]
  );

  const fillCell = (payload) =>
    payload === mouseOverPayload ? "#82ca9d" : "#8884d8";

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis tickFormatter={valueFormatter} />
        <Bar
          onMouseOver={onMouseOverBar}
          onMouseOut={onMouseOutBar}
          dataKey={barDataKey}
          label={barLabel}
        >
          {data.map((payload, index) => (
            <Cell fill={fillCell(payload)} key={`cell-${index}`} />
          ))}
          <LabelList valueAccessor={topLabelValueAccessor} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
