import { preventNavigation } from "../js/preventNavigation";

export const NavDropdownItem = ({ children, active }) => {
  return (
    <a
      className={`dropdown-item ${active ? "active" : ""}`.trim()}
      onClick={preventNavigation}
      href="#"
    >
      {children}
    </a>
  );
};
