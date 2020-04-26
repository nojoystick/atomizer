/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDrop } from 'react-dnd';
import EditorToolbar from './EditorToolbar';
import ItemTypes from '../../../config/ItemTypes';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { sizeConstants } from '../../../config/panel-size-constants';

const EditorContainer = () => {
  const [editorToolbar, setEditorToolbar] = useState({ id: uuidv4(), top: sizeConstants.HEADER_SIZE, right: 20 });
  const [interactible, setInteractible] = useState(false);

  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const right = Math.round(item.right - delta.x);
      const top = Math.round(item.top + delta.y);
      move(right, top);
      return undefined;
    }
  });

  const move = (right, top) => {
    setEditorToolbar({ right, top });
  };

  const useStyles = makeStyles({
    background: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%!important',
      height: '100% !important',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '7999',
      visibility: interactible ? 'visible' : 'hidden'
    }
  });

  useRepositioner({ editorToolbar, interactible, setInteractible, move });

  const classes = useStyles();

  return (
    <div ref={drop} className={classes.background}>
      <EditorToolbar
        id={editorToolbar.id}
        right={editorToolbar.right}
        top={editorToolbar.top}
        hideSourceOnDrag={true}
        setInteractible={setInteractible}
      />
    </div>
  );
};

const useRepositioner = ({ editorToolbar, interactible, setInteractible, move }) => {
  const { screenInfo, labVisible } = useSelector(state => state.view);

  /**
   * Keep editor on screen even when resized
   */
  useEffect(() => {
    if (!screenInfo.isMobile && !labVisible && editorToolbar.right + 300 > screenInfo.width) {
      move(20, editorToolbar.top);
    }
  }, [screenInfo.width]);

  useEffect(() => {
    if (!screenInfo.isMobile && !labVisible && editorToolbar.top + 40 > screenInfo.height) {
      move(editorToolbar.right, sizeConstants.HEADER_SIZE + 2);
    }
  }, [screenInfo.height]);

  /**
   * If screen is mobile, lock the editor in place at the top
   */
  useEffect(() => {
    if (screenInfo.isMobile) {
      setInteractible(false);
      move(0, sizeConstants.HEADER_SIZE + 2);
    }
  }, [screenInfo, interactible]);

  /**
   * If lab is open (desktop), lock the editor in place at the top
   */
  useEffect(() => {
    if (labVisible && !screenInfo.isMobile) {
      move(sizeConstants.SIDE_MENU_SIZE, sizeConstants.HEADER_SIZE + 2);
    } else if (!screenInfo.isMobile) {
      move(20, sizeConstants.HEADER_SIZE + 2);
    }
  }, [labVisible, screenInfo]);
};

export default EditorContainer;
