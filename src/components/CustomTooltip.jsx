export const CustomTooltip = ({ payload, active, label }) => {
  if (active && payload && payload.length) {
    return (
      <>
        <div className="translate-left-50-up-100">
          <div className="speech down offset-callout">{label}</div>
        </div>
        {/* <div
            style={{ transform: "translate(-50%, -100%)" }}
            className="tooltip-inner shadow-sm"
          >
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            <p className="intro">{label}</p>
            <p className="desc m-0">Anything you want can be displayed here.</p>
          </div> */}
      </>
    );
  }

  return null;
};
