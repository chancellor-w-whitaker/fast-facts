export const BrandBar = ({ children }) => {
  return (
    <div
      className="d-flex flex-wrap align-items-center p-1 my-3 text-white bg-gradient rounded shadow-sm"
      style={{ backgroundColor: "#87909A", width: "fit-content" }}
    >
      {children}
    </div>
  );
};
