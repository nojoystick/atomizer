import React, { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import useSideMenuData, { nodeEditorData } from './side-menu-data';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { configActions, networkActions } from '../../../redux/actions';
import Icon from '../../Icon';
import elements from '../../../constants/elements';
import ElementTile from '../../ElementTile';
import Tippy from '@tippyjs/react';
import 'tippy.js/animations/scale.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import SideMenuStyles from './SideMenuStyles';
import { DeleteModal } from '../../modals';
import * as Routes from '../../../constants/routes';

const SideMenuPanel = () => {
  const { menuVisible, sideMenuVisible, screenInfo } = useSelector(state => state.view);
  const theme = useSelector(state => state.network.theme);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const pianoRollData = useSelector(state => state.network.audio.pianoRollData);
  const [redirectToLab, setRedirectToLab] = useState(false);

  const classes = SideMenuStyles({
    theme: theme,
    sideMenuVisible: sideMenuVisible,
    screenInfo: screenInfo,
    menuVisible: menuVisible
  });
  const sideMenuData = useSideMenuData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(networkActions.setElementIndex(Object.keys(pianoRollData)[0], true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDropdownChange = item => {
    dispatch(networkActions.setElementIndex(item[0].atomicNumber, true));
  };

  const onClick = action => {
    dispatch(action.action());
    if (action.label === 'delete selected') {
      dispatch(configActions.setModal(DeleteModal, networkActions.delete, true));
    }
    if (action.label === 'send to node editor') {
      setRedirectToLab(true);
    }
  };

  let el = {};
  elements(theme).forEach(element => {
    if (pianoRollData[element.atomicNumber]) {
      el = { ...el, [element.atomicNumber]: element };
    }
  });

  const Tooltip = ({ action, child, delay }) => (
    <Tippy
      theme={theme && theme.name === 'dark' ? 'light' : null}
      placement='left'
      arrow={true}
      animation='scale'
      delay={[delay, 0]}
      duration={200}
      content={
        <span className={classes.tooltip}>
          <p className={classes.tooltipText}>{action.label}</p>
          <p className={classes.shortcut}>{action.shortcut}</p>
        </span>
      }
    >
      {child}
    </Tippy>
  );

  const NodeEditorButton = (
    <button className={`${classes.button} ${classes.nodeCreatorButton}`} onClick={() => onClick(nodeEditorData)}>
      <Icon
        className={`${classes.smallIcon} ${classes.bottomRight}`}
        path={nodeEditorData.icon}
        viewBox={nodeEditorData.viewBox}
        fill={'#000000'}
      />
    </button>
  );

  return (
    <div id='sideMenuPanel' className={classes.sideMenuPanel}>
      {el && el[elementIndex] && (
        <>
          <div className={classes.elementTileParent}>
            <ElementTile
              nodeData={el[elementIndex]}
              style={{
                fontSize: '14px',
                width: '100%',
                height: '100%'
              }}
            />
            <Tooltip action={nodeEditorData} child={NodeEditorButton} delay={1000} />
          </div>
          <Select
            options={Object.values(el)}
            onChange={onDropdownChange}
            className={classes.dropdown}
            values={[el[elementIndex]]}
            dropdownGap={0}
            dropdownHandle={false}
            labelField='dropdownLabel'
            onDropdownOpen={() => dispatch(configActions.setHotkeys(false))}
            onDropdownClose={() => dispatch(configActions.setHotkeys(true))}
          />
        </>
      )}

      {Object.values(sideMenuData).map((actions, i) => {
        return (
          <div key={i + 200}>
            {actions.map((action, j) => {
              const child = (
                <button className={classes.button} onClick={() => onClick(action)}>
                  <Icon
                    className={classes.icon}
                    path={action.icon.path}
                    viewBox={action.icon.viewBox}
                    fill={theme ? (action.active ? theme.secondary : theme.text) : null}
                  />
                </button>
              );
              return <Tooltip action={action} key={j} child={child} delay={0} />;
            })}
            <div className={classes.separator} />
          </div>
        );
      })}
      {redirectToLab && <Redirect to={Routes.LAB} />}
    </div>
  );
};

export default SideMenuPanel;
