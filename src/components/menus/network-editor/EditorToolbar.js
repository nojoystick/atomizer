import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import ItemTypes from '../../../config/ItemTypes';
import EditorStyles from './EditorStyles';
import useEditorData from './editor-data';
import Icon from '../../Icon';
import IconSet from '../../../constants/icon-set';
import { configActions, networkActions } from '../../../redux/actions';

const EditorToolbar = ({ id, right, top, hideSourceOnDrag, setInteractible }) => {
  const theme = useSelector(state => state.network.theme);
  const hotkeys = useSelector(state => state.config.hotkeys);
  const { screenInfo, labVisible } = useSelector(state => state.view);
  const [isOpen, setIsOpen] = useState({ menu: null, locked: false });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDraggable] = useState(true);
  const menuRef = React.createRef();

  const classes = EditorStyles({ theme: theme, screenInfo: screenInfo, isCollapsed: isCollapsed, labVisible: labVisible });
  const editorData = useEditorData();
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    item: { id, right, top, type: ItemTypes.PLAYER },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    canDrag: isDraggable
  });

  useEffect(() => {
    setInteractible(isDragging);
  }, [isDragging, setInteractible, top]);

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const _onActionClick = action => {
    if (action.action) {
      dispatch(action.action(action.passDispatch && dispatch));
    }
    if (action.modal) {
      dispatch(configActions.setModal(action.modal, action.modalAction, action.global));
      if (action.alwaysShowModal) {
        dispatch(networkActions.setModalVisible(true));
      }
    }
  };

  const _onMouseLeave = () => {
    if (!isOpen.locked) {
      let isWithinDropdown = false;
      if (menuRef.current) {
        const hoveredElements = document.querySelectorAll(':hover');
        hoveredElements.forEach(item => {
          if (menuRef.current.contains(item)) {
            isWithinDropdown = true;
          }
        });
      }
      !isWithinDropdown && setIsOpen({ menu: null, locked: false });
    }
  };

  const _onLockMenu = label => {
    setIsOpen(isOpen.menu === label && isOpen.locked ? { menu: null, locked: false } : { menu: label, locked: true });
  };

  const _onHoverMenu = label => {
    if (!isOpen.locked) {
      setIsOpen(isOpen.menu !== label ? { menu: label, locked: false } : { menu: null, locked: false });
    }
  };

  const _onCollapseMenu = () => {
    setIsOpen({ menu: null, locked: true });
    setTimeout(() => setIsOpen({ menu: null, locked: false }), 250);
    setIsCollapsed(!isCollapsed);
  };

  const DropdownMenu = ({ above }) => {
    return (
      <>
        {Object.keys(editorData).map((label, index) => {
          if (label === isOpen.menu) {
            return (
              <div className={classes.dropdown} key={index} style={{ bottom: above ? top : 'unset' }} ref={menuRef}>
                {editorData[label].map((action, j) => {
                  return (
                    <button
                      className={`${classes.option} ${action.active && classes.active}`}
                      onClick={() => _onActionClick(action)}
                      key={j}
                    >
                      <Icon
                        className={classes.icon}
                        path={action.icon.path}
                        viewBox={action.icon.viewBox}
                        fill={theme && theme.text}
                      />
                      <h3 className={classes.label}>{action.label}</h3>
                      {hotkeys && <h4 className={classes.shortcut}>{action.shortcut}</h4>}
                    </button>
                  );
                })}
              </div>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  };

  return (
    <>
      <div ref={drag} className={classes.editor} style={{ right, top }} onMouseLeave={_onMouseLeave}>
        <div className={classes.options}>
          {!isCollapsed &&
            Object.keys(editorData).map((label, index) => {
              return (
                <button
                  className={`${classes.button} ${isOpen.menu === label && classes.active}`}
                  onMouseEnter={() => _onHoverMenu(label)}
                  onClick={() => _onLockMenu(label)}
                  onMouseLeave={_onMouseLeave}
                  key={index}
                >
                  <h2 className={classes.label}>{label}</h2>
                  {isOpen.locked && isOpen.menu === label && (
                    <Icon className={classes.lockIcon} path={IconSet.lock} fill={theme && theme.secondary} />
                  )}
                </button>
              );
            })}
          <button className={`${classes.button} ${classes.hamburgerButton}`} onClick={_onCollapseMenu}>
            <Icon className={classes.hamburgerIcon} path={IconSet.hamburger} fill={theme && theme.text} />
          </button>
        </div>
        <DropdownMenu />
      </div>
    </>
  );
};

export default EditorToolbar;
