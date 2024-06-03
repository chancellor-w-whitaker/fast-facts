export const getTooltipPositionPreTranslation = (width, x, y) => {
  const centerX = x + width / 2;

  return { x: centerX, y };
};
