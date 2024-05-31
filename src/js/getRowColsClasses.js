export const getRowColsClasses = (rowCols) =>
  rowCols
    .map((object) => {
      const breakpointSegment =
        "breakpoint" in object ? `-${object.breakpoint}` : "";

      const spanSegment = "span" in object ? `-${object.span}` : "";

      return `row-cols${breakpointSegment}${spanSegment}`;
    })
    .join(" ");
