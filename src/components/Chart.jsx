import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  Cell,
  Bar,
} from "recharts";

import { useMouseOverRechartsBar } from "../hooks/useMouseOverRechartsBar";
import { CustomTooltip } from "./CustomTooltip";

export const Chart = ({
  valueFormatter,
  xAxisDataKey,
  height = 300,
  barDataKey,
  barLabel,
  data,
}) => {
  const { trackMouseOverBar, mouseOverBarEvent, isMouseOverBar } =
    useMouseOverRechartsBar();

  const { width = 0, x = 0, y = 0 } = mouseOverBarEvent;

  const tooltipPosition = { x: x + width / 2, y };

  // const applyLabelToMouseOverBar = useCallback(
  //   ({ [xAxisDataKey]: xAxisValue, payload }) => {
  //     if (isMouseOverBar(payload)) return xAxisValue;
  //   },
  //   [xAxisDataKey, isMouseOverBar]
  // );

  const fillCell = (payload) =>
    isMouseOverBar(payload) ? "#82ca9d" : "#8884d8";

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis tickFormatter={valueFormatter} />
        <Tooltip
          content={<CustomTooltip></CustomTooltip>}
          formatter={valueFormatter}
          position={tooltipPosition}
          isAnimationActive={false}
          active={width > 0}
        ></Tooltip>
        <Bar {...trackMouseOverBar} dataKey={barDataKey} label={barLabel}>
          {data.map((payload, index) => (
            <Cell fill={fillCell(payload)} key={`cell-${index}`} />
          ))}
          {/* <LabelList valueAccessor={applyLabelToMouseOverBar} position="top" /> */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
