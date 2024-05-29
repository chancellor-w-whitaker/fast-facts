import { useCallback, useState, useRef } from "react";

import { useClickOutside } from "./useClickOutside";

export const usePopover = () => {
  const popover = useRef();

  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  return { popover, isOpen, toggle };
};
