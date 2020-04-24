import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { configActions, networkActions } from '../redux/actions';
import { isEmpty } from 'react-redux-firebase';
import PianoRollData from '../audio/PianoRollData';

const useLoadFirestoreValues = (theme, hotkeys, login, pianoRollData) => {
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
    dispatch(networkActions.setPianoRollData(pianoRollData && pianoRollData.length > 0 ? pianoRollData[0] : PianoRollData));
  }, [dispatch, pianoRollData]);

  useEffect(() => {
    if (!isEmpty(auth) && !isEmpty(profile)) {
      dispatch(configActions.setLogin({ valid: true }));
    }
  }, [dispatch, login, auth, profile]);
};

export default useLoadFirestoreValues;
