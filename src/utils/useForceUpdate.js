import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { configActions } from '../redux/actions';

export default function useForceUpdate(itemToUpdate) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  return () => {
    setValue(value => ++value);
    dispatch(configActions.setItemToUpdate(itemToUpdate, value));
  };
}
