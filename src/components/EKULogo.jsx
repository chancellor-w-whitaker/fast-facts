import { EKULogoAspectRatio } from "../js/EKULogoAspectRatio";

export const EKULogo = ({ height = 38 }) => {
  const width = height * EKULogoAspectRatio;

  return (
    <img className="me-3" height={height} width={width} src="eku.svg" alt="" />
  );
};
