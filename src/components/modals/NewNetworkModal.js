import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';
import SaveNetworkModal from './SaveNetworkModal';

const NewNetworkModal = React.forwardRef(({ cancel, confirm }, ref) => {
  const unsavedChanges = useSelector(state => state.network.unsavedChanges);
  const [showSave, setShowSave] = useState(false);
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  if (!unsavedChanges && !showSave) {
    confirm();
  }
  return (
    <>
      {showSave ? (
        <SaveNetworkModal cancel={cancel} confirm={confirm} />
      ) : (
        <div className={classes.content} ref={ref}>
          <h3>just checking</h3>
          <p className={classes.text}>do you want to save your changes?</p>
          <div className={classes.buttonContainer}>
            <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
              cancel
            </button>
            <button className={`${classes.button} ${classes.confirmButton}`} onClick={confirm}>
              discard changes
            </button>
            <button className={`${classes.button} ${classes.confirmButton}`} onClick={() => setShowSave(true)}>
              save changes
            </button>
          </div>
        </div>
      )}
    </>
  );
});

export default NewNetworkModal;
