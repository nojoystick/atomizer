import React, {useState} from 'react';
import '../stylesheets/SideMenuPanel.scss';
import { networkStateConstants } from '../constants/network-constants'
import { BOTTOM_MENU_SIZE, SIDE_MENU_SIZE } from '../config/panel-size-constants';

const defaultClassName = 'networkButton';
const selectedClassName = 'networkButton selected';
const defaultMap = {
  [networkStateConstants.ADD_EDGES.key]: defaultClassName,
  [networkStateConstants.MULTISELECT.key]: defaultClassName,
  [networkStateConstants.ORGANIZE.key]: defaultClassName
}

const SideMenuPanel = ({show, setShow, networkProps}) => {
  const { menuVisible, sideMenuVisible } = show;
  const { setNetworkState } = networkProps;
  
  const [classNameMap, setClassNameMap] = useState(defaultMap)

  const menuStyle = {
    width: `${sideMenuVisible ? SIDE_MENU_SIZE+'px' : '0px'}`,
    height: window.innerHeight - 40 - (menuVisible ? BOTTOM_MENU_SIZE : 0)
  }

  const onClick = (action) => {
    let state = action.key;
    if(classNameMap[action.key]){
      const curr = classNameMap[action.key];
      toggleClassNameMap(action.key, curr);
      state = (curr===defaultClassName) ? action.key : null;
    }
    else {
      setClassNameMap(defaultMap);
    }
    if(action.close){
      Object.keys(setShow).forEach(func => {setShow[func](false)});
    }
    setNetworkState(state);
  }

  const toggleClassNameMap = (key, curr) => {
    let classNameMapCopy = {...classNameMap, 
                              [key]: curr===defaultClassName ? 
                                selectedClassName : 
                                defaultClassName 
                             };
    if(key === networkStateConstants.ADD_EDGES.key){
      classNameMapCopy = {...classNameMapCopy, [networkStateConstants.MULTISELECT.key]: defaultClassName}
    }
    if(key === networkStateConstants.MULTISELECT.key){
      classNameMapCopy = {...classNameMapCopy, [networkStateConstants.ADD_EDGES.key]: defaultClassName}
    }
    setClassNameMap(classNameMapCopy)
  }

  return (
    <div id="sideMenuPanel" 
         className="sideMenuPanel" 
         style={menuStyle}
    >
      <h2 className='editorHeader'>network editor</h2>
      <div className="networkButtons floatRight">
        {Object.keys(networkStateConstants).map((key, index) => {
          const action = networkStateConstants[key];
          return <button className={classNameMap[action.key] ? classNameMap[action.key]: defaultClassName} key={index} onClick={() => onClick(action)}>{action.label}</button>
        })}
      </div>
    </div>
    
  )
}

export default SideMenuPanel;