import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { keysToNotesMap, modeToOffsetMap, modeToSemitoneOffsetMap } from '../../constants/frequencies';
import Player from '../../audio/Player';
import Audio from '../../audio/Audio';

const noteToMod = {
  whole: null,
  half: 8,
  quarter: 4,
  eighth: 2,
  sixteenth: 1
};

const Grid = ({ width, node, pianoRoll, setPianoRoll, height, color, save, note }) => {
  const theme = useSelector(state => state.network.theme);
  const key = useSelector(state => state.network.audio.key);
  const disposition = useSelector(state => state.network.audio.disposition);
  const rerender = useSelector(state => state.config.itemToUpdate);
  const [table, setTable] = useState(null);
  const classes = useStyles({ theme: theme, height: height, width: width, color: color, interval: Player.interval });

  useEffect(() => {
    const setNote = (i, j, e) => {
      if (!e || e.buttons === 1) {
        const selCopy = pianoRoll.slice();
        selCopy[i][j] = selCopy[i][j] === -1 ? 1 : -1;
        setPianoRoll(selCopy);
        save();
      }
    };

    const getNoteName = i => {
      let index = height - 1 - i + (disposition === 'c' ? modeToSemitoneOffsetMap[node.mode] : modeToOffsetMap[node.mode]);
      if (index >= height) {
        index -= height - 1;
      }
      return keysToNotesMap[disposition][key.label][index];
    };
    const createTable = () => {
      let table = [];
      for (let i = 0; i < height; ++i) {
        let children = [];
        const measureIsPlaying =
          node &&
          !node.mute &&
          node.solo !== -1 &&
          Player.nodesThisMeasure &&
          Player.nodesThisMeasure.filter(el => el.options && el.options.audioNode && el.options.audioNode.id === node.id).length >
            0 &&
          Audio.context.currentTime < Player.measureStopTime;
        for (let j = -1; j < 16; ++j) {
          const isPlaying =
            measureIsPlaying && Math.floor(j / noteToMod[note]) === Math.floor(Player.beatIndex / noteToMod[note]);
          j === -1
            ? children.push(
                <td className={classes.scaleLabel} key={rerender && rerender[0] === 'mode' && rerender[1] + 100}>
                  {node && getNoteName(i)}
                </td>
              )
            : pianoRoll[i] &&
              pianoRoll[i][j] &&
              (pianoRoll[i][j] === -1 || pianoRoll[i][j] === 1) &&
              children.push(
                <td className={classes.tableCell} key={j}>
                  <button
                    key={rerender && rerender[0] === 'player' && rerender[1] + 50}
                    className={`${classes.button} ${pianoRoll &&
                      pianoRoll[i] &&
                      pianoRoll[i][j] !== -1 &&
                      classes.selected} ${isPlaying && classes.playing}`}
                    onMouseDown={() => setNote(i, j)}
                    onPointerEnter={e => setNote(i, j, e)}
                  />
                </td>
              );
        }
        table.push(<tr key={i}>{children}</tr>);
      }
      return (
        <table className={classes.table}>
          <thead>{table}</thead>
        </table>
      );
    };
    setTable(createTable());
  }, [pianoRoll, setPianoRoll, height, disposition, key, classes, node, save, rerender, note]);
  return <>{table}</>;
};

const useStyles = makeStyles({
  table: {
    margin: 'auto'
  },
  tableCell: {
    width: props => `${350 / props.width}px`,
    padding: props => (props.height === 8 ? '3px' : '0px')
  },
  scaleLabel: {
    width: '20px',
    color: props => props.theme && props.theme.text,
    fontSize: props => (props.height === 8 ? '16px' : '14px !important'),
    fontWeight: '800',
    fontFamily: 'Inconsolata'
  },
  button: {
    boxSizing: 'border-box',
    height: props => (props.height === 8 ? '40px' : '30px'),
    width: '100%',
    backgroundColor: 'transparent',
    opacity: '0.7',
    border: props => `2px solid ${props.theme && props.theme.secondaryText}`,
    boxShadow: props => props.theme && props.themeboxShadow,
    '&:hover': {
      opacity: '0.3'
    }
  },
  selected: {
    backgroundColor: props => props.color
  },
  playing: {
    border: props => `2px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadowLight,
    filter: 'brightness(110%)'
  }
});

export default Grid;
