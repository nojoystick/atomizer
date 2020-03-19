/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Network from '../components/network/Network';
import MenuPanel from '../components/menus/main/MenuPanel';
import SideMenuPanel from '../components/menus/network-editor/SideMenuPanel';
import NodeDetailPanel from '../components/menus/node-detail/NodeDetailPanel';
import Modal from '../components/Modal';
import Icon from '../components/Icon';
import IconSet from '../constants/icon-set';
import '../stylesheets/Home.scss';
import { sizeConstants } from '../config';
import ColorVariables from '../stylesheets/Colors.scss';
import { useResizer, useHotkeys, useElementIndexHotkeys } from '../utils/hotkeys';
import { useSelector, useDispatch } from 'react-redux';
import { viewActions } from '../redux/actions';

const iconColor = ColorVariables.text;

const Home = () => {
  const [show, setShow] = useState(false);
  const { textVisible, menuVisible, sideMenuVisible, nodeDetailVisible, screenInfo } = useSelector(state => state.view);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewActions.setTextVisible(true));
    setShow(true);
  }, [dispatch]);

  useHotkeys();
  useResizer();
  useElementIndexHotkeys();

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <Modal />
      <div
        className='textFlexContainer floatLeft'
        style={{
          height: `${textVisible ? '100%' : '30px'}`,
          maxWidth: `${textVisible ? '' : '160px'}`,
          transition: `${textVisible ? 'max-width 0s' : 'max-width 1s'}`
        }}
        onClick={() => {
          dispatch(viewActions.setTextVisible(!textVisible));
        }}
      >
        <p className='disappearingText' style={getTextStyle(textVisible, screenInfo)}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea quas maiores adipisci doloremque impedit illum illo
          natus mollitia possimus blanditiis accusantium, ut nostrum. Voluptates modi eum maiores repellat molestias!
        </p>
        {getExpandIcon('textHideShowIcon', [0, 180], textVisible)}
      </div>

      <Network />
      <SideMenuPanel />
      <MenuPanel />
      <NodeDetailPanel />

      <button
        className='sideMenuButton'
        style={{ right: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 4 + 'px' : '-6px'}` }}
        onClick={() => dispatch(viewActions.setSideMenuVisible(!sideMenuVisible))}
      >
        {getExpandIcon('expandIcon', [90, 270], sideMenuVisible)}
      </button>
      <button
        className='menuButton'
        style={{ bottom: `${menuVisible ? sizeConstants.BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'}` }}
        onClick={() => dispatch(viewActions.setMenuVisible(!menuVisible))}
      >
        {getExpandIcon('expandIcon', [180, 0], menuVisible)}
      </button>
      <button
        className='menuButton'
        style={getDetailStyle(menuVisible, sideMenuVisible)}
        onClick={() => dispatch(viewActions.setNodeDetailVisible(!nodeDetailVisible))}
      >
        {getExpandIcon('expandIcon', [180, 0], nodeDetailVisible)}
      </button>
    </div>
  );
};

const getTextStyle = (textVisible, screenInfo) => {
  return textVisible
    ? {
        opacity: 1.0,
        visibility: 'visible',
        height: screenInfo.width < screenInfo.breakpoint ? '120px' : '70px'
      }
    : {
        opacity: 0.0,
        visibility: 'hidden',
        height: '0px'
      };
};

const getDetailStyle = (menuVisible, sideMenuVisible) => {
  return {
    bottom: `${menuVisible ? sizeConstants.BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'}`,
    left: 'unset',
    right: `${sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px' : '40px'}`
  };
};

const getExpandIcon = (className, rotation, visible) => {
  return (
    <Icon
      className={className}
      style={{ transform: `rotate(${visible ? rotation[0] + 'deg' : rotation[1] + 'deg'})` }}
      fill={iconColor}
      viewBox='3 5 10 5'
      path={IconSet.expandArrow}
    />
  );
};

export default Home;
