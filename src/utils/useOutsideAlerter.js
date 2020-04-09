import { useEffect } from 'react';
/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref, handler, show) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    if (show === false) {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, ref, show]);
};

export default useOutsideAlerter;
