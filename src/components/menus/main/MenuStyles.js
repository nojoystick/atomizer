import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const MenuStyles = makeStyles({
  menuPanel: {
    position: 'absolute',
    bottom: props => (props.menuVisible ? '0px' : '-10px'),
    width: props => (props.labVisible ? props.screenInfo.width - sizeConstants.SIDE_MENU_SIZE + 'px' : '100%'),
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'height 0.5s, width 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    overflowY: 'scroll',
    display: 'flex',
    boxSizing: 'border-box',
    zIndex: '8001',
    height: props => (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px'),
    boxShadow: props =>
      !props.screenInfo.isMobile && props.menuVisible && props.theme && `inset 0px 0px 20px 20px ${props.theme.boxShadowColor}`
  },
  navIcon: {
    margin: '20px',
    width: '20px',
    height: '20px',
    display: 'inline-block'
  },
  iconContainer: {
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    transition: '0.2s',
    border: 'none',
    borderBottom: props => `1px solid ${props.theme && props.theme.text}`,
    cursor: 'pointer',
    '& :hover': {
      opacity: '0.6'
    }
  },
  show: {
    height: '100%',
    minWidth: props => (props.screenInfo.isMobile ? '80% !important' : '50% !important')
  },
  navIcons: {
    margin: '0px 15px 0px 15px',
    width: '60px',
    minWidth: props => (props.showSideMenu ? (props.screenInfo.isMobile ? '80%' : '50%') : '60px'),
    height: '100%',
    justifyContent: 'center',
    transition: '0.5s',
    backgroundColor: 'transparent'
  },
  ellipsisIcon: {
    color: props => props.theme && props.theme.text,
    margin: '0px 0px 0px 15px',
    width: '15px',
    height: '15px',
    display: 'inline-block',
    backgroundColor: 'transparent'
  }
});

export default MenuStyles;
