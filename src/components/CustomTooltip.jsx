import { Fragment } from "react";

const descriptionKey = "DESCR1";

export const CustomTooltip = (props) => {
  const { formatter, payload, active, label } = props;

  if (active && payload && payload.length) {
    return (
      <>
        <div className="translate-left-50-up-100">
          <div className="speech down translate-up-callout-size text-center">
            <div>{label}</div>
            {payload.map(
              (
                { payload: { [descriptionKey]: description = "" }, value },
                index
              ) => (
                <Fragment key={index}>
                  {description.length > 0 && (
                    <div key={index}>{description}</div>
                  )}
                  <div>{formatter(value)}</div>
                </Fragment>
              )
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
};

// const DefaultTooltip = ({ label = "Label", itemList = [{}] }) => {
//   return (
//     <>
//       <div
//         style={{
//           border: "1px solid rgb(204, 204, 204)",
//           backgroundColor: "rgb(255, 255, 255)",
//           whiteSpace: "nowrap",
//           padding: 10,
//           margin: 0,
//         }}
//         className="recharts-default-tooltip"
//       >
//         <p className="recharts-tooltip-label" style={{ margin: 0 }}>
//           {label}
//         </p>
//         <ul
//           className="recharts-tooltip-item-list"
//           style={{ padding: 0, margin: 0 }}
//         >
//           {itemList.map(
//             (
//               { separator = ":", value = "value", name = "name", unit = "" },
//               index
//             ) => (
//               <li
//                 style={{
//                   color: "rgb(136, 132, 216)",
//                   display: "block",
//                   paddingBottom: 4,
//                   paddingTop: 4,
//                 }}
//                 className="recharts-tooltip-item"
//                 key={index}
//               >
//                 <span className="recharts-tooltip-item-name">{name}</span>
//                 <span className="recharts-tooltip-item-separator">{` ${separator} `}</span>
//                 <span className="recharts-tooltip-item-value">{value}</span>
//                 <span className="recharts-tooltip-item-unit">{unit}</span>
//               </li>
//             )
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };
