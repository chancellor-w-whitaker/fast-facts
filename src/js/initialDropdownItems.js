import { dataFiles } from "./dataFiles";

export const initialDropdownItems = dataFiles.map(({ title, id }) => ({
  children: title,
  active: false,
  id,
}));
