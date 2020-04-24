import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';

const MobileWarningModal = React.forwardRef(({ cancel }, ref) => {
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  return (
    <div className={classes.content} ref={ref}>
      <h3>hi mobile user</h3>
      <p className={classes.text}>
        just a warning - mobile support for this site isn't great yet. check back in a couple weeks for the optimum experience.
      </p>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.confirmButton} ${classes.wideButton}`} onClick={cancel}>
          you've been warned
        </button>
      </div>
    </div>
  );
});

export default MobileWarningModal;
