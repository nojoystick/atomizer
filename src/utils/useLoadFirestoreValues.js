import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { configActions, networkActions } from '../redux/actions';

const useLoadFirestoreValues = (theme, hotkeys) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(networkActions.setTheme(theme));
  }, [dispatch, theme])

  useEffect(() => {
    dispatch(configActions.setHotkeys(hotkeys));
  }, [dispatch, hotkeys])
}

export default useLoadFirestoreValues;