import React from 'react';
import ModeSelector from '../ModeSelector';
import InputSlider from '../InputSlider';
import KeyDropdowns from '../KeyDropdowns';
import { tempoBounds } from '../../constants/audio-data';
import PlayerStyles from '../menus/player/PlayerStyles';
import { useSelector, useDispatch } from 'react-redux';
import { networkActions } from '../../redux/actions';
import Icon from '../Icon';
import IconSet from '../../constants/icon-set';

const PlayerEditor = ({ node }) => {
  const playing = useSelector(state => state.network.audio.playing);
  const theme = useSelector(state => state.network.theme);

  const classes = PlayerStyles({ theme: theme });
  const dispatch = useDispatch();

  return (
    <>
      <div className={classes.parent}>
        <div className={`${classes.row} ${classes.short}`}>
          <button className={classes.button} onClick={() => dispatch(networkActions.playOrPause())}>
            <Icon
              className={classes.playIcon}
              fill={theme && theme.text}
              viewBox='0 0 300 300'
              path={playing ? IconSet.pause : IconSet.play}
            />
          </button>
          <button className={classes.button} onClick={() => dispatch(networkActions.stop())}>
            <Icon className={classes.stopIcon} fill={theme && theme.text} viewBox='0 0 300 300' path={IconSet.stop} />
          </button>
        </div>

        <div className={`${classes.row} ${classes.med} ${classes.last}`}>
          <InputSlider
            useStyles={PlayerStyles}
            label='tempo'
            min={tempoBounds.min}
            max={tempoBounds.max}
            decimals={0}
            defaultValue='masterTempo'
            defaultValueConversion={1}
            onChange={networkActions.setTempo}
            globalValue={true}
          />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.parent} style={{ paddingTop: '5px' }}>
          <ModeSelector mode={node.mode} audioNode={node} />
          <KeyDropdowns renderInBody={true} style={{ marginTop: '13px', marginLeft: '-10px' }} />
        </div>
      </div>
    </>
  );
};

export default PlayerEditor;
