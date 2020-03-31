import { sizeConstants } from '../config';
import { makeStyles } from '@material-ui/styles';

const HomeStyles = makeStyles({
  expandIcon: {
    marginBottom: '2px',
    width: '10px',
    height: '5px',
    transition: 'transform 0.5s'
  },
  button: {
    position: 'absolute',
    outline: 'none',
    transition: 'bottom 0.5s, left 0.5s, right 0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    zIndex: 3,
    boxSizing: 'border-box',
    '&:hover': {
      opacity: 0.6
    }
  },
  menuButton: {
    width: '100px',
    height: '36px',
    left: '40px',
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '2px 2px 0px 2px',
    bottom: props => (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE - 10 + 'px' : '-10px'),
    right: props => (props.sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px' : '40px')
  },
  sideMenuButton: {
    top: '52px',
    width: '36px',
    height: '100px',
    marginLeft: '40px',
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '2px 0px 2px 2px',
    right: props => (props.sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 4 + 'px' : '-6px')
  }
});

export default HomeStyles;
