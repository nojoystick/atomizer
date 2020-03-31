import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { configActions, networkActions } from '../redux/actions';

const useLoadFirestoreValues = (theme, hotkeys, auth) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(networkActions.setTheme(theme));
  }, [dispatch, theme]);

  useEffect(() => {
    dispatch(configActions.setHotkeys(hotkeys));
  }, [dispatch, hotkeys]);

  useEffect(() => {
    // dispatch(configActions.setLogin({valid: !auth.isEmpty }))
  }, [dispatch, auth]);
};

export default useLoadFirestoreValues;
