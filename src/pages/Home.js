import React, { useState, useEffect } from 'react';
import Network from './Network';
import MenuPanel from './MenuPanel';
import SideMenuPanel from './SideMenuPanel';
import Icon from '../components/Icon'
import IconSet from '../constants/icon-set'
import '../stylesheets/Home.scss'
import { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE } from '../config/panel-size-constants'

const Home = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [iconColor, setIconColor] = useState('black');
  const [menuVisible, setMenuVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [networkState, setNetworkState] = useState(null);

  useEffect(() => {
    setTextVisible(true);
    setTimeout(() => setTextVisible(false), 8000);
  }, [])

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }
  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  }

  return (
    <div>
      <div className="textContainer floatLeft" 
          style={{height: `${textVisible ? '100px' : '0px'}`}}
          onClick={() => setTextVisible(false)}
      >
        <p className="disappearingText" 
          style={{opacity: `${textVisible ? 1.0 : 0.0}`}} 
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea quas maiores adipisci doloremque impedit illum illo natus mollitia possimus blanditiis accusantium, ut nostrum. Voluptates modi eum maiores repellat molestias!
        </p>
      </div>
      <button className="sideMenuButton" 
              style={{right: `${sideMenuVisible ? SIDE_MENU_SIZE+'px' : '0px'}`}} 
              onClick={toggleSideMenu} 
              onMouseEnter={() => setIconColor('darkgray')} 
              onMouseLeave={() => setIconColor('black')}
      >
        <Icon className="expandIcon" 
              style={{transform: `rotate(${sideMenuVisible ? '90deg' : '270deg'})`}} 
              fill={iconColor} 
              viewBox="3 5 10 5" 
              path={IconSet.expandArrow} 
        />
      </button>
      <SideMenuPanel show={sideMenuVisible} setNetworkState={setNetworkState}/>
      <Network menuVisible={menuVisible} state={networkState} setState={setNetworkState}/>
      <MenuPanel show={menuVisible}/>
      <button className="menuButton" 
              style={{bottom: `${menuVisible ? BOTTOM_MENU_SIZE+'px' : '0px'}`}} 
              onClick={toggleMenu} 
              onMouseEnter={() => setIconColor('darkgray')} 
              onMouseLeave={() => setIconColor('black')}
      >
        <Icon className="expandIcon" 
              style={{transform: `rotate(${menuVisible ? '180deg' : '0deg'})`}} 
              fill={iconColor} 
              viewBox="3 5 10 5" 
              path={IconSet.expandArrow} 
        />
      </button>
    </div>
  )
}

export default Home;