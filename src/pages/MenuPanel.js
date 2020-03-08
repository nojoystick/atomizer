import React from 'react';
import SubPanel from './SubPanel'
import SubPanelData from '../config/sub-panel-data';
import '../stylesheets/MenuPanel.scss';

const MenuPanel = ({show}) => {
  const menuStyle = {
    height: `${show ? '480px' : '0px'}`
  }

  return (
    <div id="menuPanel" 
         className="menuPanel" 
         style={menuStyle}
    >
      {SubPanelData.map((subPanel, index) => {
        return <SubPanel data={subPanel} key={index}/>
      })}
    </div>
  )
}

export default MenuPanel;