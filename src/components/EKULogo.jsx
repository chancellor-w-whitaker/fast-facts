import { ekuLogoDimensions } from "../js/ekuLogoDimensions";

export const EKULogo = () => {
  return (
    <img
      height={ekuLogoDimensions.height}
      width={ekuLogoDimensions.width}
      className="me-3"
      src="eku.svg"
      alt=""
    />
  );
};
