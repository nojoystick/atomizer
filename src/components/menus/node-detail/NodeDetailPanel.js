import React, { useEffect, useState } from 'react';
import { sizeConstants } from '../../../config';
import ElementTile from './ElementTile';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { useSelector } from 'react-redux';
import { useNodeDetailHotkeys } from '../../../utils/hotkeys';
import { makeStyles } from '@material-ui/styles';

const NodeDetailPanel = () => {
  const { menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);
  const { network, selectedNodes } = useSelector(state => state.network);
  const [nodeData, setNodeData] = useState(null);
  const { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE, HEADER_SIZE } = sizeConstants;
  const [index, setIndex] = useState(0);

  const theme = useSelector(state => state.network.theme);
  const useStyles = makeStyles({
    nodeDetailPanel: {
      position: 'absolute',
      borderStyle: 'solid',
      borderColor: theme.text,
      borderWidth: '3px 3px 0px 3px',
      height: `${
        nodeDetailVisible
          ? menuVisible
            ? screenInfo.height - BOTTOM_MENU_SIZE - HEADER_SIZE + 21 + 'px'
            : BOTTOM_MENU_SIZE + 'px'
          : '0px'
      }`,
      right: `${screenInfo.width < screenInfo.breakpoint ? '-3px' : sideMenuVisible ? SIDE_MENU_SIZE - 5 + 'px' : '0px'}`,
      bottom: `${menuVisible ? (nodeDetailVisible ? BOTTOM_MENU_SIZE - 13 + 'px' : BOTTOM_MENU_SIZE - 16 + 'px') : '-10px'}`,
      width: `${screenInfo.width < screenInfo.breakpoint ? '100%' : '350px'}`,
      margin: '0px',
      transition: '0.5s',
      backgroundColor: theme.background,
      overflowY: 'scroll',
      zIndex: '2'
    },
    nodeHeader: {
      padding: '5px',
      display: 'block'
    },
    bigNodeTitle: {
      padding: '5px',
      display: 'block',
      fontSize: '1.5em'
    },
    placeholder: {
      height: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.5s',
      opacity: '0'
    },
    placeholderText: {
      fontStyle: 'italic',
      fontSize: '1.2em',
      color: theme.secondary,
      height: '0px',
      justifySelf: 'center',
      alignSelf: 'center'
    },
    nodeToolbar: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0',
      transition: '0.5s',
      visibility: 'hidden'
    },
    show: {
      opacity: '1',
      visibility: 'visible'
    },
    scrollButton: {
      flexGrow: '1',
      height: '100px',
      border: 'none',
      backgroundColor: theme.background,
      outline: 'none',
      '&:hover': {
        opacity: '0.4'
      }
    },
    scrollIcon: {
      width: '20px',
      height: '10px'
    }
  });

  const classes = useStyles();

  useEffect(() => {
    if (selectedNodes && selectedNodes[0]) {
      if (index > selectedNodes.length - 1) {
        let i = index;
        while (i > selectedNodes.length - 1) {
          i--;
        }
        setIndex(i);
      }
      setNodeData(Object.values(network.body.nodes).find(el => el.id === selectedNodes[index]));
    } else {
      setNodeData(null);
    }
  }, [index, network, nodeData, selectedNodes]);

  const updateIndex = (val, ind) => {
    if (selectedNodes) {
      let i = ind + val;
      if (i < 0) {
        i = selectedNodes.length - 1;
      } else if (i > selectedNodes.length - 1 && selectedNodes.length > 0) {
        i = 0;
      }
      setIndex(i);
    }
  };

  useNodeDetailHotkeys(index, updateIndex);

  const menuStyle = () => {
    return {};
  };

  return (
    <div id='nodeDetailPanel' className={classes.nodeDetailPanel} style={menuStyle()}>
      <h2 className={classes.nodeHeader}>node editor</h2>
      <div className={`${classes.nodeToolbar} ${nodeData ? classes.show : null}`}>
        <button className={classes.scrollButton} onClick={() => updateIndex(-1, index)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(270deg)` }}
            fill={theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
        <ElementTile nodeData={nodeData} />
        <button className={classes.scrollButton} onClick={() => updateIndex(1, index)}>
          <Icon
            className={classes.scrollIcon}
            style={{ transform: `rotate(90deg)` }}
            fill={theme.text}
            viewBox='3 5 10 5'
            path={IconSet.expandArrow}
          />
        </button>
      </div>

      <div className={`${classes.placeholder} ${nodeData ? null : classes.show}`}>
        <p className={classes.placeholderText}>no nodes selected</p>
      </div>
    </div>
  );
};

export default NodeDetailPanel;
