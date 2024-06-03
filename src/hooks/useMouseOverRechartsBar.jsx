import { useCallback, useState } from "react";

export const useMouseOverRechartsBar = () => {
  const [event, setEvent] = useState({ payload: {} });

  const eventPayload = event.payload;

  const onMouseOver = useCallback((event) => setEvent(event), []);

  const onMouseOut = useCallback(() => setEvent({ payload: {} }), []);

  const isActiveBar = useCallback(
    (payload) => payload === eventPayload,
    [eventPayload]
  );

  return {
    trackMouseOverBar: { onMouseOver, onMouseOut },
    mouseOverBarEvent: event,
    isActiveBar,
  };
};
