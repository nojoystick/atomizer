import React, {useState} from 'react';
import '../stylesheets/SideMenuPanel.scss';
import { networkStateConstants } from '../constants/network-constants'
import { SIDE_MENU_SIZE } from '../config/panel-size-constants';

const defaultClassName = 'networkButton';
const selectedClassName = 'networkButton selected';

const SideMenuPanel = ({show, setNetworkState}) => {
  const [classNameMap, setClassNameMap] = useState({
    [networkStateConstants.ADD_EDGES.key]: defaultClassName,
    [networkStateConstants.MULTISELECT.key]: defaultClassName,
    [networkStateConstants.ORGANIZE.key]: defaultClassName
  })

  const menuStyle = {
    width: `${show ? SIDE_MENU_SIZE+'px' : '0px'}`
  }

  const onClick = (action, index) => {
    let state = action.key;
    if(classNameMap[action.key]){
      const curr = classNameMap[action.key];
      setClassNameMap(
        {...classNameMap, 
          [action.key]: curr===defaultClassName ? 
                        selectedClassName : 
                        defaultClassName 
        })
      state = (curr===defaultClassName) ? action.key : null;
      // todo: quick fix; cant have select multiple AND add edges active at the same time
    }
    setNetworkState(state);
  }

  return (
    <div id="sideMenuPanel" 
         className="sideMenuPanel" 
         style={menuStyle}
    >
      <h1 className='editorHeader'>network editor</h1>
      <div className="networkButtons floatRight">
        {Object.keys(networkStateConstants).map((key, index) => {
          const action = networkStateConstants[key];
          return <button className={classNameMap[action.key] ? classNameMap[action.key]: defaultClassName} key={index} onClick={() => onClick(action, index)}>{action.label}</button>
        })}
      </div>
    </div>
    
  )
}

export default SideMenuPanel;