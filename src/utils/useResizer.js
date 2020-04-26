import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';

export default function useResizer() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleSizeChange = () => {
      dispatch(viewActions.setScreenDimensions(window.innerWidth, window.innerHeight));
    };
    window.addEventListener('resize', handleSizeChange);
    return () => {
      window.removeEventListener('resize', handleSizeChange);
    };
  }, [dispatch]);
}
