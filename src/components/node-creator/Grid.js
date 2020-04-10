import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { keysToNotesMap, modeToOffsetMap } from '../../constants/frequencies';

const Grid = ({ width, mode, pianoRoll, setPianoRoll, height }) => {
  const theme = useSelector(state => state.network.theme);
  const key = useSelector(state => state.network.audio.key);
  const disposition = useSelector(state => state.network.audio.disposition);
  const [table, setTable] = useState(null);
  const classes = useStyles({ theme: theme, height: height, width: width });

  useEffect(() => {
    const setNote = (i, j, e) => {
      if (!e || e.buttons === 1) {
        const selCopy = pianoRoll.slice();
        selCopy[i][j] = selCopy[i][j] === -1 ? 1 : -1;
        setPianoRoll(selCopy);
      }
    };

    const getNoteName = i => {
      let index = height - 1 - i + modeToOffsetMap[mode];
      if (index >= height) {
        index -= height - 1;
      }
      return keysToNotesMap[disposition][key.label][index];
    };
    const createTable = () => {
      let table = [];
      for (let i = 0; i < height; ++i) {
        let children = [];
        // increment across the pianoRoll here instaed of the for loop!!
        for (let j = -1; j < 16; ++j) {
          // eslint-disable-next-line no-lone-blocks
          {
            j === -1
              ? children.push(
                  <td className={classes.scaleLabel} key={j}>
                    {getNoteName(i)}
                  </td>
                )
              : pianoRoll[i] &&
                pianoRoll[i][j] &&
                (pianoRoll[i][j] === -1 || pianoRoll[i][j] === 1) &&
                children.push(
                  <td className={classes.tableCell} key={j}>
                    <button
                      className={`${classes.button} ${pianoRoll && pianoRoll[i] && pianoRoll[i][j] !== -1 && classes.selected}`}
                      onMouseDown={() => setNote(i, j)}
                      onPointerEnter={e => setNote(i, j, e)}
                    />
                  </td>
                );
          }
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
  }, [
    pianoRoll,
    setPianoRoll,
    height,
    mode,
    disposition,
    key.label,
    classes.table,
    classes.scaleLabel,
    classes.tableCell,
    classes.button,
    classes.selected
  ]);

  return <>{table}</>;
};

const useStyles = makeStyles({
  table: {
    margin: 'auto',
    marginTop: '20px'
  },
  tableCell: {
    width: props => `${350 / props.width}px`,
    height: props => (props.height === 8 ? '20px' : '15px !important'),
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
    width: '100%',
    height: props => (props.height === 8 ? '20px' : '15px !important'),
    backgroundColor: 'transparent',
    border: props => `2px solid ${props.theme && props.theme.text}`,
    outline: 'none',
    '&:hover': {
      opacity: '0.5'
    }
  },
  selected: {
    backgroundColor: props => props.theme && props.theme.nonMetal
  }
});

export default Grid;
