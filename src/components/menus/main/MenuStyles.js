import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const MenuStyles = makeStyles({
  menuPanel: {
    position: 'absolute',
    bottom: '-10px',
    width: '100%',
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'height 0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    overflowY: 'scroll',
    display: 'flex',
    boxSizing: 'border-box',
    zIndex: '8001',
    height: props => (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px')
  },
  navIcon: {
    margin: '20px',
    width: '20px',
    height: '20px',
    display: 'inline-block'
  },
  iconContainer: {
    backgroundColor: props => props.theme && props.theme.background,
    boxSizing: 'border-box',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    transition: '0.2s',
    border: 'none',
    borderBottom: `1px solid ${props => props.theme && props.theme.text}`,
    cursor: 'pointer',
    outline: 'none',
    '& :hover': {
      opacity: '0.6'
    }
  },
  show: {
    height: '100%',
    minWidth: props => (props.screenInfo.width < 500 ? '80% !important' : '50% !important')
  },
  navIcons: {
    margin: '0px 15px 0px 15px',
    width: '60px',
    minWidth: props => (props.showSideMenu ? (props.screenInfo.width < 500 ? '80%' : '50%') : '60px'),
    height: '100%',
    justifyContent: 'center',
    transition: '0.5s'
  },
  ellipsisIcon: {
    color: props => props.theme && props.theme.text,
    margin: '0px 0px 0px 15px',
    width: '15px',
    height: '15px',
    display: 'inline-block'
  }
});

export default MenuStyles;
