import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';

const DeleteModal = React.forwardRef((props, ref) => {
  const { cancel, confirm } = props;
  const selectedNodes = useSelector(state => state.network.selectedNodes);
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  return (
    <div className={classes.content} ref={ref}>
      <h3>just checking</h3>
      <p className={classes.text}>{`are you sure you want to delete ${selectedNodes && selectedNodes.length} items?`}</p>
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

export default DeleteModal;
