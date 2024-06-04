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
import { getTicksAndDomain } from "../js/getTicksAndDomain";
import { normalizeValue } from "../js/normalizeValue";
import { CustomTooltip } from "./CustomTooltip";
import { brandColors } from "../js/brandColors";
import { pSBC } from "../js/pSBC";

const {
  kentuckyBluegrass,
  // goldenrodYellow,
  // autumnOrange,
  // booneBronze,
  solidWhite,
  solidBlack,
  ekuMaroon,
  // lightGray,
  darkGray,
} = brandColors;

// const purple = "#800080";

const tryGradient = true;

const barLabelPosition = "insideTop";

const tooltipCursor = { fill: "transparent" };

export const CustomBarChart = ({
  activeBarColor = kentuckyBluegrass,
  barColor = ekuMaroon,
  valueFormatter,
  xAxisDataKey,
  height = 250,
  barDataKey,
  data,
}) => {
  const barLabel = {
    position: barLabelPosition,
    formatter: valueFormatter,
    fill: solidWhite,
    fillOpacity: 1,
  };

  const yValues = data.map(({ [barDataKey]: value }) => value);

  const [dataMin, dataMax] = [Math.min(...yValues), Math.max(...yValues)];

  const { domain: yAxisDomain, ticks: yAxisTicks } = getTicksAndDomain({
    dataValues: yValues,
  });

  const { trackMouseOverBar, mouseOverBarEvent, isActiveBar } =
    useMouseOverRechartsBar();

  const fillCell = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, dataMin, dataMax);

    const tweakPercentage = 1 - normalizedValue;

    const tweakedColor = pSBC(tweakPercentage, barColor, darkGray);

    return isActiveBar(payload)
      ? activeBarColor
      : tryGradient
      ? tweakedColor
      : barColor;
  };

  const getFillOpacity = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, dataMin, dataMax);

    return tryGradient
      ? 1
      : isActiveBar(payload)
      ? activeBarColor
      : normalizedValue;
  };

  const {
    width: activeBarWidth = 0,
    x: activeBarX = 0,
    y: activeBarY = 0,
  } = mouseOverBarEvent;

  const [tooltipPosition, tooltipActive] = [
    getTooltipPositionPreTranslation(activeBarWidth, activeBarX, activeBarY),
    activeBarWidth > 0,
  ];

  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} stroke={solidBlack} />
        <YAxis
          tickFormatter={valueFormatter}
          domain={yAxisDomain}
          stroke={solidBlack}
          ticks={yAxisTicks}
        />
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
