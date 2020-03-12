import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handler) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

function useNetworkHotkeys(setCtrl) {

  const _onKeyDown = (e) => {
    if(e.ctrlKey || e.key==="Meta"){
      setCtrl(true);
    }
  }

  const _onKeyUp = (e) => {
    if(e.ctrlKey || e.key==="Meta"){
      setCtrl(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("keydown", _onKeyDown);
    document.addEventListener("keyup", _onKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", _onKeyDown);
      document.removeEventListener("keyup", _onKeyUp);
    };
  });
}

export { useOutsideAlerter, useNetworkHotkeys }