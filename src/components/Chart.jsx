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
  const [mouseOverEvent, setMouseOverEvent] = useState({ payload: {} });

  const mouseOverEventPayload = mouseOverEvent.payload;

  const onMouseOverBar = useCallback((e) => setMouseOverEvent(e), []);

  const onMouseOutBar = useCallback(
    () => setMouseOverEvent({ payload: {} }),
    []
  );

  const topLabelValueAccessor = useCallback(
    ({ [xAxisDataKey]: xAxisValue, payload }) => {
      if (mouseOverEventPayload === payload) {
        return xAxisValue;
      }
    },
    [xAxisDataKey, mouseOverEventPayload]
  );

  const fillCell = (payload) =>
    payload === mouseOverEventPayload ? "#82ca9d" : "#8884d8";

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis tickFormatter={valueFormatter} />
        {/* <Tooltip
          position={{ x: mouseOverEvent?.x, y: mouseOverEvent?.y }}
          formatter={valueFormatter}
        ></Tooltip> */}
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
