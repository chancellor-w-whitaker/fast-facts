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
import { normalizeValue } from "../js/normalizeValue";
import { CustomTooltip } from "./CustomTooltip";
import { brandColors } from "../js/brandColors";
import { getDomain } from "../js/getDomain";
import { pSBC } from "../js/pSBC";

const {
  kentuckyBluegrass,
  goldenrodYellow,
  autumnOrange,
  booneBronze,
  solidWhite,
  solidBlack,
  ekuMaroon,
  lightGray,
  darkGray,
} = brandColors;

const purple = "#800080";

const tryGradient = true;

const barLabelPosition = "insideTop";

const tooltipCursor = { fill: "transparent" };

export const CustomBarChart = ({
  activeBarColor = kentuckyBluegrass,
  barColor = purple,
  valueFormatter,
  xAxisDataKey,
  height = 250,
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
    position: barLabelPosition,
    formatter: valueFormatter,
    fill: solidWhite,
    fillOpacity: 1,
  };

  const yValues = data.map(({ [barDataKey]: value }) => value);

  const yAxisDomain = getDomain(yValues);

  const fillCell = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, ...yAxisDomain);

    const dimPercentage = 1 - normalizedValue;

    const dimmedColor = pSBC(dimPercentage, barColor);

    return isActiveBar(payload)
      ? activeBarColor
      : tryGradient
      ? dimmedColor
      : barColor;
  };

  const getFillOpacity = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, ...yAxisDomain);

    return tryGradient
      ? 1
      : isActiveBar(payload)
      ? activeBarColor
      : normalizedValue;
  };

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
          cursor={tooltipCursor}
          active={tooltipActive}
        ></Tooltip>
        <Bar {...trackMouseOverBar} dataKey={barDataKey} label={barLabel}>
          {data.map((payload, index) => (
            <Cell
              fillOpacity={getFillOpacity(payload)}
              fill={fillCell(payload)}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
