import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';
import elements from '../../constants/elements';
import ElementTile from '../ElementTile';
import { networkActions } from '../../redux/actions';

const CopyNodeModal = React.forwardRef(({ cancel }, ref) => {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const [elementList, setElementList] = useState(elements(theme));
  const nodeData = useSelector(state => state.network.audio.nodeData);
  const dispatch = useDispatch();
  const classes = DeleteModalStyles({ theme: theme, screenInfo: screenInfo });

  useEffect(() => {
    setElementList(elements(theme));
  }, [theme]);

  const _confirm = el => {
    dispatch(networkActions.copyNodeFromIndex(el.atomicNumber));
    cancel();
  };

  return (
    <div className={`${classes.content} ${classes.backedContent}`} ref={ref}>
      <h3>make a copy</h3>
      <p>pick an existing node to make a carbon (lol) copy</p>
      <div className={classes.elementTilesParent}>
        {elementList.map((el, index) => {
          if (nodeData[el.atomicNumber] && nodeData[el.atomicNumber].notes) {
            return (
              <button className={classes.noFootprintButton} onClick={() => _confirm(el)} key={index}>
                <ElementTile element={el} customStyle={{ margin: '5px' }} />
              </button>
            );
          }
          return null;
        })}
      </div>
      <div className={`${classes.buttonContainer} ${classes.endButtonContainer}`}>
        <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
          cancel
        </button>
      </div>
    </div>
  );
});

export default CopyNodeModal;
