import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  Cell,
  Bar,
} from "recharts";
import { useMemo } from "react";

import { getTooltipPositionPreTranslation } from "../js/getTooltipPositionPreTranslation";
import { useMouseOverRechartsBar } from "../hooks/useMouseOverRechartsBar";
import { CustomTooltip } from "./CustomTooltip";

/*

const domain = useMemo(() => {
  const allValues = [
    ...chartData.map(({ [delayedMeasure]: value }) => value),
    ...chartData.map(({ prediction }) => prediction),
  ];

  const [min, max] = [Math.min(...allValues), Math.max(...allValues)];

  const base = 2;

  const power = Math.floor(getBaseLog(base, min));

  const multiple = Math.pow(base, power);

  const domain = [Math.floor(min / multiple) * multiple, "auto"];

  return domain;
}, [chartData, delayedMeasure]);

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

*/

export const Chart = ({
  activeBarColor = "#e6a65d",
  barColor = "#009681",
  valueFormatter,
  xAxisDataKey,
  height = 300,
  barDataKey,
  data,
}) => {
  const { trackMouseOverBar, mouseOverBarEvent, isActiveBar } =
    useMouseOverRechartsBar();

  const {
    width: activeBarWidth = 0,
    x: activeBarX = 0,
    y: activeBarY = 0,
  } = mouseOverBarEvent;

  const tooltipActive = activeBarWidth > 0;

  const tooltipPosition = useMemo(
    () =>
      getTooltipPositionPreTranslation(activeBarWidth, activeBarX, activeBarY),
    [activeBarWidth, activeBarX, activeBarY]
  );

  const barLabel = useMemo(
    () => ({
      formatter: valueFormatter,
      position: "insideTop",
      fill: "white",
    }),
    [valueFormatter]
  );

  const fillCell = (payload) =>
    isActiveBar(payload) ? activeBarColor : barColor;

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
          active={tooltipActive}
        ></Tooltip>
        <Bar {...trackMouseOverBar} dataKey={barDataKey} label={barLabel}>
          {data.map((payload, index) => (
            <Cell fill={fillCell(payload)} key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
