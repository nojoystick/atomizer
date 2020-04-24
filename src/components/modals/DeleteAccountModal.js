import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';

const DeleteAccountModal = React.forwardRef(({ cancel, confirm }, ref) => {
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  return (
    <div className={classes.content} ref={ref}>
      <h3>whoa there</h3>
      <p className={classes.text}>are you sure you want to delete your account? this action can't be undone.</p>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
          cancel
        </button>
        <button className={`${classes.button} ${classes.confirmButton}`} onClick={confirm}>
          confirm
        </button>
      </div>
    </div>
  );
});

export default DeleteAccountModal;
