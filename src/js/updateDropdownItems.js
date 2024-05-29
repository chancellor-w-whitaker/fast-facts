import { initialDropdownItems } from "./initialDropdownItems";

export const updateDropdownItems = (fileID) => {
  return initialDropdownItems.map((item) =>
    item.id === fileID ? { ...item, active: true } : item
  );
};
