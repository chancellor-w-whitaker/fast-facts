export const getBarLabel = ({
  breakpointWidth = 600,
  containerWidth = 0,
  formatter,
}) => {
  const containerIsSmall = containerWidth < breakpointWidth;

  return {
    position: containerIsSmall ? null : "insideTop",
    angle: containerIsSmall ? -90 : 0,
    fillOpacity: 1,
    fill: "white",
    formatter,
  };
};
