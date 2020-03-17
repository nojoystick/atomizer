/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function useNetworkHotkeys(setCtrl) {
  const _onKeyDown = e => {
    if (e.ctrlKey || e.key === 'Meta') {
      setCtrl(true);
    }
  };

  const _onKeyUp = e => {
    if (e.ctrlKey || e.key === 'Meta') {
      setCtrl(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('keydown', _onKeyDown);
    document.addEventListener('keyup', _onKeyUp);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', _onKeyDown);
      document.removeEventListener('keyup', _onKeyUp);
    };
  });
}

function useResizer(setWindowSize) {
  const _onResize = e => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', _onResize);
    return () => {
      window.removeEventListener('resize', _onResize);
    };
  });
}

function useMenuHandler(screenSize, screenBreakpoint) {
  const { textVisible, menuVisible, sideMenuVisible, nodeDetailVisible } = useSelector(state => state.view);
  const dispatch = useDispatch();

  // useEffects can't be iterated unfortunately
  useEffect(() => {
    if (screenSize.width < screenBreakpoint && textVisible) {
      dispatch(viewActions.closeAllOthers(textVisible));
    }
  }, [textVisible]);

  useEffect(() => {
    if (screenSize.width < screenBreakpoint && menuVisible) {
      dispatch(viewActions.closeAllOthers(menuVisible));
    }
  }, [menuVisible]);

  useEffect(() => {
    if (screenSize.width < screenBreakpoint && sideMenuVisible) {
      dispatch(viewActions.closeAllOthers(sideMenuVisible));
    }
  }, [sideMenuVisible]);

  useEffect(() => {
    if (screenSize.width < screenBreakpoint && nodeDetailVisible) {
      dispatch(viewActions.closeAllOthers(nodeDetailVisible));
    }
  }, [nodeDetailVisible]);
}

function useHotkeys() {
  const _onKeyDown = event => {
    switch (event.key) {
      case 'a':
        break;
      case 's':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', _onKeyDown);
    return () => {
      window.removeEventListener('keydown', _onKeyDown);
    };
  });
}

export { useOutsideAlerter, useNetworkHotkeys, useResizer, useMenuHandler, useHotkeys };
