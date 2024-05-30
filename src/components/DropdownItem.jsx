export const DropdownItem = ({ children, active }) => {
  return (
    <a
      className={`dropdown-item ${active ? "active" : ""}`.trim()}
      onClick={(e) => e.preventDefault()}
      href="#"
    >
      {children}
    </a>
  );
};
