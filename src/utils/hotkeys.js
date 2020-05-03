import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configActions, networkActions, viewActions } from '../redux/actions';
import { DeleteModal } from '../components/modals';
import useSideMenuData from '../components/menus/network-editor/editor-data';

function useResizer() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _onResize = e => {
      dispatch(viewActions.setScreenDimensions(window.innerWidth, window.innerHeight));
    };
    function debounced(delay, fn) {
      let timerId;
      return function(...args) {
        if (timerId) {
          clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
          fn(...args);
          timerId = null;
        }, delay);
      };
    }
    const tHandler = debounced(100, _onResize);
    window.addEventListener('resize', tHandler);
    return () => {
      window.removeEventListener('resize', tHandler);
    };
  });
}

function useMultiSelectHotkeys(setCtrl) {
  const multiSelectState = useSelector(state => state.network.multiSelectState);
  useEffect(() => {
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
    if (multiSelectState) {
      document.addEventListener('keydown', _onKeyDown);
      document.addEventListener('keyup', _onKeyUp);
    } else {
      document.removeEventListener('keydown', _onKeyDown);
      document.removeEventListener('keyup', _onKeyUp);
    }
    return () => {
      document.removeEventListener('keydown', _onKeyDown);
      document.removeEventListener('keyup', _onKeyUp);
    };
  }, [multiSelectState, setCtrl]);
}

function useElementIndexHotkeys() {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const dispatch = useDispatch();

  const _onKeyUp = e => {
    if (e.key === 'ArrowDown') {
      dispatch(networkActions.setElementIndex(parseInt(elementIndex) + 1, true));
    } else if (e.key === 'ArrowUp') {
      dispatch(networkActions.setElementIndex(parseInt(elementIndex) - 1, true));
    } else if (e.key === 'ArrowRight') {
      dispatch(networkActions.setElementIndex(parseInt(elementIndex) + 1));
    } else if (e.key === 'ArrowLeft') {
      dispatch(networkActions.setElementIndex(parseInt(elementIndex) - 1));
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', _onKeyUp);
    return () => {
      document.removeEventListener('keyup', _onKeyUp);
    };
  });
}

function usePlayerHotkeys() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _onKeyDown = e => {
      if (e.key === 'm') {
        dispatch(networkActions.setMuted());
      } else if (e.key === 'n') {
        dispatch(networkActions.setSoloed());
      } else if (e.code === 'Space') {
        dispatch(networkActions.playOrPause());
      }
    };
    document.addEventListener('keydown', _onKeyDown);
    return () => {
      document.removeEventListener('keydown', _onKeyDown);
    };
  }, [dispatch]);
}

function useHotkeys(enabled) {
  const hotkeys = useSelector(state => state.config.hotkeys);
  const dispatch = useDispatch();
  const sideMenuData = useSideMenuData();

  // ES6 code
  function throttled(delay, fn) {
    let lastCall = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  const _onKeyDown = event => {
    if (hotkeys) {
      Object.values(sideMenuData).forEach(type => {
        type.forEach(action => {
          if (action.shortcut === event.key) {
            if (action.label === 'delete selected') {
              dispatch(configActions.setModal(DeleteModal, networkActions.delete, true));
            }
            dispatch(action.action(action.passDispatch && dispatch));
          }
        });
      });
    }
  };

  const handler = throttled(100, _onKeyDown);

  useEffect(() => {
    if (hotkeys && enabled !== false) {
      window.addEventListener('keydown', handler);
    } else {
      window.removeEventListener('keydown', handler);
    }
    return () => {
      window.removeEventListener('keydown', handler);
    };
  });
}

export { useMultiSelectHotkeys, useElementIndexHotkeys, usePlayerHotkeys, useResizer, useHotkeys };
