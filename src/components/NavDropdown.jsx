import { useCallback } from "react";

import { usePopover } from "../hooks/usePopover";
import { DropdownItem } from "./DropdownItem";

export const NavDropdown = ({ onItemClick, items = [], children }) => {
  const { popover, isOpen, toggle } = usePopover();

  const open = useCallback(
    (e) => {
      e.preventDefault();

      toggle(true);
    },
    [toggle]
  );

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link text-light fs-4 dropdown-toggle"
        onClick={open}
        role="button"
        href="#"
      >
        {children}
      </a>
      {isOpen && (
        <ul className="dropdown-menu shadow-sm show" ref={popover}>
          {items.map(({ children, active, id }) => (
            <li onClick={() => onItemClick(id)} key={id}>
              <DropdownItem active={active}>{children}</DropdownItem>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
