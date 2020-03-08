import React, { useState, useEffect } from 'react';
import Network from './Network';
import MenuPanel from './MenuPanel';
import Icon from '../components/Icon'
import IconSet from '../constants/IconSet'
import '../stylesheets/Home.css'

const Home = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [iconColor, setIconColor] = useState('black');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
    setTimeout(() => setTextVisible(false), 8000);
  }, [])

  const showMenu = () => {
    setMenuVisible(!menuVisible);
  }

  return (
    <>
    <div className="textContainer" 
         style={{height: `${textVisible ? '100px' : '0px'}`}}
    >
      <p className="disappearingText" 
         style={{opacity: `${textVisible ? 1.0 : 0.0}`}} 
         onClick={()=>setTextVisible(false)}
      >
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea quas maiores adipisci doloremque impedit illum illo natus mollitia possimus blanditiis accusantium, ut nostrum. Voluptates modi eum maiores repellat molestias!
      </p>
    </div>
    <Network />
    <MenuPanel show={menuVisible}/>
    <button className="menuButton" 
            style={{bottom: `${menuVisible ? '450px' : '0px'}`}} 
            onClick={showMenu} 
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
    </>
  )
}

export default Home;