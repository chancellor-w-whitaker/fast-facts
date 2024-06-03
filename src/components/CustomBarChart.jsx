import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  Cell,
  Bar,
} from "recharts";

import { getTooltipPositionPreTranslation } from "../js/getTooltipPositionPreTranslation";
import { useMouseOverRechartsBar } from "../hooks/useMouseOverRechartsBar";
import { CustomTooltip } from "./CustomTooltip";
import { getDomain } from "../js/getDomain";

export const CustomBarChart = ({
  activeBarColor = "#009681",
  barColor = "purple",
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

  const tooltipPosition = getTooltipPositionPreTranslation(
    activeBarWidth,
    activeBarX,
    activeBarY
  );

  const barLabel = {
    formatter: valueFormatter,
    position: "insideTop",
    fillOpacity: 1,
    fill: "white",
  };

  const fillCell = (payload) =>
    isActiveBar(payload) ? activeBarColor : barColor;

  const yValues = data.map(({ [barDataKey]: value }) => value);

  const yAxisDomain = getDomain(yValues);

  const [lowerBound, upperBound] = yAxisDomain;

  const getFillOpacity = (yValue) =>
    (yValue - lowerBound) / (upperBound - lowerBound);

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis tickFormatter={valueFormatter} domain={yAxisDomain} />
        <Tooltip
          content={<CustomTooltip></CustomTooltip>}
          formatter={valueFormatter}
          position={tooltipPosition}
          isAnimationActive={false}
          active={tooltipActive}
        ></Tooltip>
        <Bar {...trackMouseOverBar} dataKey={barDataKey} label={barLabel}>
          {data.map((payload, index) => (
            <Cell
              fillOpacity={
                !isActiveBar(payload) ? getFillOpacity(payload[barDataKey]) : 1
              }
              fill={fillCell(payload)}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
