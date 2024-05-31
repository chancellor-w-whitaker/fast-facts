import { getRowColsClasses } from "../js/getRowColsClasses";

export const RowColsGrid = ({
  rowCols = [{ span: "auto" }],
  className = "",
  children = [],
}) => {
  const rowColsClasses = getRowColsClasses(rowCols);

  return (
    <div className={`container ${className}`.trim()}>
      <div className={`row ${rowColsClasses}`.trim()}>
        {children.map((content, index) => (
          <div className="col" key={index}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};
