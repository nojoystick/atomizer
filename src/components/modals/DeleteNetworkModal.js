import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';

const DeleteNetworkModal = React.forwardRef(({ cancel, confirm }, ref) => {
  const theme = useSelector(state => state.network.theme);
  const profile = useSelector(state => state.firebase.profile);
  const id = !profile.isEmpty ? profile.email : 'default';
  const loadedNetworkName = useSelector(state => state.network.loadedNetworkName);

  useFirestoreConnect(() => [{ collection: 'networks', doc: id }]);
  const firestore = useFirestore();
  const classes = DeleteModalStyles({ theme: theme });

  if (!loadedNetworkName || profile.isEmpty) {
    confirm();
    cancel();
  }

  const _onConfirm = () => {
    const networkRef = firestore.collection('networks').doc(id);
    networkRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        let newValues = docSnapshot.data();
        delete newValues[loadedNetworkName];
        firestore
          .collection('networks')
          .doc(profile.email)
          .set(newValues);
      }
    });
    confirm();
    cancel();
  };
  return (
    <div className={classes.content} ref={ref}>
      <h3>just checking</h3>
      <p className={classes.text}>are you sure you want to delete this track? you won't be able to recover it.</p>
      <div className={classes.buttonContainer}>
        <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
          cancel
        </button>
        <button className={`${classes.button} ${classes.confirmButton}`} onClick={_onConfirm}>
          delete
        </button>
      </div>
    </div>
  );
});

export default DeleteNetworkModal;
