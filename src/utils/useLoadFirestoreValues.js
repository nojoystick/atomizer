import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configActions, networkActions } from '../redux/actions';
import { isEmpty } from 'react-redux-firebase';

const useLoadFirestoreValues = (theme, hotkeys, login) => {
  const auth = useSelector(state => state.firebase.auth);
  const profile = useSelector(state => state.firebase.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(networkActions.setTheme(theme));
  }, [dispatch, theme]);

  useEffect(() => {
    dispatch(configActions.setHotkeys(hotkeys));
  }, [dispatch, hotkeys]);

  useEffect(() => {
    if (!isEmpty(auth) && !isEmpty(profile)) {
      dispatch(configActions.setLogin({ valid: true }));
    }
  }, [dispatch, login, auth, profile]);
};

export default useLoadFirestoreValues;
