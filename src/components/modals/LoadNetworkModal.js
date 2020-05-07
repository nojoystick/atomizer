import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModalStyles from './DeleteModalStyles';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import * as Routes from '../../constants/routes';
import { networkActions } from '../../redux/actions';
import Player from '../../audio/Player';

const SaveNetworkModal = React.forwardRef(({ cancel }, ref) => {
  const [redirect, setRedirect] = useState(false);
  const [content, setContent] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [list, setList] = useState(null);
  const theme = useSelector(state => state.network.theme);
  const classes = DeleteModalStyles({ theme: theme });
  const profile = useSelector(state => state.firebase.profile);
  const id = !profile.isEmpty ? profile.email : 'default';

  useFirestoreConnect(() => [{ collection: 'networks', doc: id }]);
  const firestore = useFirestore();
  const dispatch = useDispatch();

  useEffect(() => {
    const networkRef = firestore.collection('networks').doc(id);
    (async () => {
      await networkRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
          setList(docSnapshot.data());
        }
      });
      setContentLoaded(true);
    })();
    Player.beatIndex = 0;
    Player.measuresPlayed = 0;
  }, [firestore, id]);

  useEffect(() => {
    const selectItem = name => {
      dispatch(networkActions.loadNetwork(name, list[name]));
      cancel();
    };
    const NetworkList = () => {
      return (
        <div className={classes.listParent}>
          {list && Object.keys(list).length > 0 ? (
            Object.keys(list).map((key, index) => {
              return (
                <button className={classes.listItem} key={index} value={key} onClick={e => selectItem(e.target.value)}>
                  {key}
                </button>
              );
            })
          ) : (
            <p className={classes.text} style={{ paddingLeft: '10px' }}>
              looks like you haven't saved any networks yet!
            </p>
          )}
        </div>
      );
    };

    const LoginMessage = () => {
      return (
        <p className={classes.text} style={{ paddingLeft: '10px' }}>
          you'll need to be logged in to do that
        </p>
      );
    };

    const redirect = () => {
      setRedirect(true);
      setTimeout(() => cancel(), 200);
    };

    const defaultContent = {
      Component: NetworkList,
      buttonContainerClass: classes.endButtonContainer
    };

    setContent(
      profile.isEmpty
        ? {
            Component: LoginMessage,
            confirmText: 'log in or sign up',
            buttonClass: classes.wideButton,
            buttonContainerClass: classes.wideButtonContainer,
            confirm: redirect
          }
        : defaultContent
    );
  }, [cancel, classes, contentLoaded, dispatch, firestore, id, list, profile]);

  return (
    <div className={classes.content} ref={ref}>
      {content && contentLoaded && (
        <>
          <h3>load your tune</h3>
          <content.Component />
          <div className={`${classes.buttonContainer} ${content.buttonContainerClass}`}>
            <button className={`${classes.button} ${classes.cancelButton}`} onClick={cancel}>
              cancel
            </button>
            {content.confirm && (
              <button
                className={`${classes.button} ${content.buttonClass ? content.buttonClass : classes.confirmButton}`}
                onClick={content.confirm}
              >
                {content.confirmText}
              </button>
            )}
          </div>
          {redirect && <Redirect to={Routes.LOG_IN} />}
        </>
      )}
    </div>
  );
});

export default SaveNetworkModal;
