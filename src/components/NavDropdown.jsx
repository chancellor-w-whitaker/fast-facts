import { useCallback } from "react";

import { NavDropdownItem } from "./NavDropdownItem";
import { usePopover } from "../hooks/usePopover";

export const NavDropdown = ({ onItemClick, children, items }) => {
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
        className="nav-link link-light fs-4 dropdown-toggle"
        onClick={open}
        role="button"
        href="#"
      >
        {children}
      </a>
      {isOpen && (
        <ul
          className="dropdown-menu shadow-sm show position-absolute end-0"
          ref={popover}
        >
          {Array.isArray(items) &&
            items.map(({ id, ...rest }) => (
              <li onClick={() => onItemClick(id)} key={id}>
                <NavDropdownItem {...rest}></NavDropdownItem>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
};
