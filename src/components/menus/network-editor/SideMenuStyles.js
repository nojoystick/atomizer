import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const SideMenuStyles = makeStyles({
  sideMenuPanel: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    right: '-6px',
    width: props => (props.sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'),
    height: props =>
      props.screenInfo.height - sizeConstants.HEADER_SIZE + 20 - (props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE : 0),
    borderLeft: props => props.theme && `3px solid ${props.theme.text}`,
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'width 0.5s, height 0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    zIndex: 1,
    overflowY: 'scroll'
  },
  editorHeader: {
    padding: '5px',
    whiteSpace: 'nowrap'
  },
  icon: {
    width: '40px',
    height: '40px'
  },
  button: {
    display: 'block',
    border: 'none',
    height: '60px',
    width: '65px',
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    margin: 'auto',
    fontSize: '12px',
    '&:hover': {
      opacity: '0.4'
    }
  },
  selected: {
    fontWeight: '800'
  },
  dropdown: {
    width: '50px !important',
    maxWidth: '60px',
    height: '18px !important',
    minHeight: '18px !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    zIndex: '3',
    borderWidth: '0px 0px 2px 0px !important',
    borderColor: `${props => props.theme && props.theme.text} $important`,
    outline: 'none !important',
    boxShadow: 'none !important',
    padding: '0px !important',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`,
      outline: 'none'
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  },
  separator: {
    width: '60px',
    height: '2px',
    margin: 'auto',
    marginTop: '5px',
    marginBottom: '5px',
    backgroundColor: props => props.theme && props.theme.text
  },
  tooltip: {
    height: '40px',
    display: 'flex'
  },
  tooltipText: {
    display: 'block',
    color: props => props.theme && props.theme.background,
    fontSize: '14px',
    height: '35px'
  },
  shortcut: {
    fontSize: '14px',
    marginLeft: '0px',
    display: 'block',
    opacity: '0.6'
  }
});

export default SideMenuStyles;
