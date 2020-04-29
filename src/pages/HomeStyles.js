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
    transition: 'bottom 0.5s, left 0.5s, right 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    color: props => props.theme && props.theme.text,
    zIndex: 8001,
    boxSizing: 'border-box',
    '&:hover': {
      opacity: 0.6
    }
  },
  menuButton: {
    width: '100px',
    height: '36px',
    right: props => (props.labVisible ? props.screenInfo.width - 150 + 'px' : 'calc(50% - 50px)'),
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '2px 2px 0px 2px',
    bottom: props => (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : props.labVisible ? '80px' : '-10px')
  },
  menuButtonMobile: {
    right: '50vw !important',
    bottom: props => (props.labVisible || props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '80px')
  },
  labButton: {
    bottom: props => (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '40%'),
    width: '36px',
    height: '100px',
    marginLeft: '40px',
    zIndex: '8005',
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '2px 0px 2px 2px',
    right: props => (props.labVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px')
  },
  labButtonMobile: {
    width: '100px',
    height: '36px',
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '2px 2px 0px 2px',
    bottom: props => (props.menuVisible || props.labVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '80px'),
    left: '50vw'
  }
});

export default HomeStyles;
