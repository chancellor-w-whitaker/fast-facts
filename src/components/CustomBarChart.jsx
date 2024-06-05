import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  YAxis,
  XAxis,
  Cell,
  Bar,
} from "recharts";
import { useState } from "react";

import { getTooltipPositionPreTranslation } from "../js/getTooltipPositionPreTranslation";
import { useMouseOverRechartsBar } from "../hooks/useMouseOverRechartsBar";
import { transparentTooltipCursor } from "../js/transparentTooltipCursor";
import { getTicksAndDomain } from "../js/getTicksAndDomain";
import { normalizeValue } from "../js/normalizeValue";
import { CustomTooltip } from "./CustomTooltip";
import { brandColors } from "../js/brandColors";
import { getBarLabel } from "../js/getBarLabel";
import { axisStroke } from "../js/axisStroke";
import { pSBC } from "../js/pSBC";

const { kentuckyBluegrass, ekuMaroon, darkGray } = brandColors;

const shouldBlendColors = true;

const [fromColor, toColor] = [ekuMaroon, darkGray];

export const CustomBarChart = ({
  activeBarColor = kentuckyBluegrass,
  barColor = fromColor,
  valueFormatter,
  xAxisDataKey,
  height = 250,
  barDataKey,
  data,
}) => {
  const yValues = data.map(({ [barDataKey]: value }) => value);

  const [dataMin, dataMax] = [Math.min(...yValues), Math.max(...yValues)];

  const { domain: yAxisDomain, ticks: yAxisTicks } = getTicksAndDomain({
    dataValues: yValues,
    tickCount: 6,
  });

  const { trackMouseOverBar, mouseOverBarEvent, isActiveBar } =
    useMouseOverRechartsBar();

  const fillCell = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, dataMin, dataMax);

    const tweakPercentage = 1 - normalizedValue;

    const tweakedColor = pSBC(tweakPercentage, barColor, toColor);

    return isActiveBar(payload)
      ? activeBarColor
      : shouldBlendColors
      ? tweakedColor
      : barColor;
  };

  const getFillOpacity = (payload) => {
    const value = payload[barDataKey];

    const normalizedValue = normalizeValue(value, dataMin, dataMax);

    return shouldBlendColors
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

  const [preTranslationTooltipPosition, mouseOverOccurring] = [
    getTooltipPositionPreTranslation(activeBarWidth, activeBarX, activeBarY),
    activeBarWidth > 0,
  ];

  const [responsiveContainerWidth, setResponsiveContainerWidth] = useState(0);

  const onResize = (width) => setResponsiveContainerWidth(width);

  const barLabel = getBarLabel({
    containerWidth: responsiveContainerWidth,
    formatter: valueFormatter,
  });

  return (
    <ResponsiveContainer onResize={onResize} height={height}>
      <BarChart data={data}>
        <XAxis dataKey={xAxisDataKey} stroke={axisStroke} />
        <YAxis
          tickFormatter={valueFormatter}
          domain={yAxisDomain}
          stroke={axisStroke}
          ticks={yAxisTicks}
        />
        <Tooltip
          content={<CustomTooltip></CustomTooltip>}
          position={preTranslationTooltipPosition}
          cursor={transparentTooltipCursor}
          active={mouseOverOccurring}
          formatter={valueFormatter}
          isAnimationActive={false}
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
