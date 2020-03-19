import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configActions, networkActions, viewActions } from '../redux/actions';
import { modalContent } from '../config';

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

function useModalHotkeys(confirm, cancel) {
  const modalVisible = useSelector(state => state.network.modalVisible);
  useEffect(() => {
    const _onKeyDown = e => {
      if (e.key === 'Enter') {
        confirm();
      } else {
        cancel();
      }
    };

    if (modalVisible) {
      document.addEventListener('keydown', _onKeyDown);
    } else {
      document.removeEventListener('keydown', _onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', _onKeyDown);
    };
  }, [cancel, confirm, modalVisible]);
}

function useNodeDetailHotkeys(index, setIndex) {
  const nodeDetailVisible = useSelector(state => state.view.nodeDetailVisible);
  useEffect(() => {
    const _onKeyDown = e => {
      if (e.key === 'ArrowRight') {
        setIndex(1, index);
      } else if (e.key === 'ArrowLeft') {
        setIndex(-1, index);
      }
    };

    if (nodeDetailVisible) {
      document.addEventListener('keydown', _onKeyDown);
    } else {
      document.removeEventListener('keydown', _onKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', _onKeyDown);
    };
  }, [index, nodeDetailVisible, setIndex]);
}

function useElementIndexHotkeys() {
  const elementIndex = useSelector(state => state.network.elementIndex);
  const dispatch = useDispatch();
  useEffect(() => {
    const _onKeyDown = e => {
      if (e.key === 'ArrowDown') {
        dispatch(networkActions.setElementIndex(elementIndex + 1));
      } else if (e.key === 'ArrowUp') {
        dispatch(networkActions.setElementIndex(elementIndex - 1));
      }
    };

    document.addEventListener('keydown', _onKeyDown);
    return () => {
      document.removeEventListener('keydown', _onKeyDown);
    };
  }, [dispatch, elementIndex]);
}

function useHotkeys() {
  const { menuVisible, nodeDetailVisible, sideMenuVisible } = useSelector(state => state.view);
  const dispatch = useDispatch();
  const _onKeyDown = event => {
    switch (event.key) {
      case 'Backspace':
        dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
        dispatch(networkActions.deleteSelected());
        break;
      case 'Escape':
        dispatch(viewActions.closeAll());
        break;
      // interact
      case 'a':
        dispatch(networkActions.addNodeFromMenu());
        break;
      case 's':
        dispatch(networkActions.selectAll());
        break;
      case 'd':
        dispatch(configActions.setModal(modalContent.header, modalContent.message, networkActions.delete));
        dispatch(networkActions.deleteSelected());
        break;
      case 'f':
        dispatch(networkActions.editEdge());
        break;
      // mode
      case 'q':
        dispatch(networkActions.defaultMode());
        break;
      case 'w':
        dispatch(networkActions.toggleSelect());
        break;
      case 'e':
        dispatch(networkActions.addEdge());
        break;
      // view
      case 'z':
        dispatch(networkActions.organize());
        break;
      case 'x':
        dispatch(viewActions.closeAll());
        break;
      // menus
      case 'b':
        dispatch(viewActions.setMenuVisible(!menuVisible));
        break;
      case 'n':
        dispatch(viewActions.setNodeDetailVisible(!nodeDetailVisible));
        break;
      case 'm':
        dispatch(viewActions.setSideMenuVisible(!sideMenuVisible));
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

export { useMultiSelectHotkeys, useModalHotkeys, useNodeDetailHotkeys, useElementIndexHotkeys, useResizer, useHotkeys };
