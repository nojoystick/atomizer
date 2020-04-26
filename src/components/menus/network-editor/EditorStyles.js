import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const EditorStyles = makeStyles({
  editor: {
    width: props =>
      props.screenInfo.isMobile && !props.isCollapsed
        ? '100%'
        : !props.screenInfo.isMobile && props.screenInfo.width < 1200 && props.labVisible && !props.isCollapsed
        ? props.screenInfo.width - sizeConstants.SIDE_MENU_SIZE + 'px'
        : props.isCollapsed
        ? '40px'
        : '265px',
    display: 'flex',
    flexDirection: 'column',
    height: '40px',
    border: props => props.theme && `3px solid ${props.theme.text}`,
    backgroundColor: props => props.theme && props.theme.secondaryBackgroundSolid,
    position: 'absolute',
    zIndex: '8000',
    pointerEvents: 'auto',
    visibility: 'visible',
    alignItems: 'center',
    boxShadow: props => props.theme && props.theme.boxShadow,
    boxSizing: 'border-box',
    transition: '0.5s, right 0.5s, width 0.25s, top 0.5s'
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: '10px',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text,
    border: 'none',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.6'
    }
  },
  active: {
    backgroundColor: 'rgba(100, 100, 100, 0.2) !important',
    color: props => props.theme && props.theme.text,
    transition: '1s'
  },
  label: {
    '&:hover': {
      opacity: '1.0'
    }
  },
  dropdown: {
    width: '100%',
    height: '200px',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => props.theme && `3px solid ${props.theme.text}`,
    zIndex: '8000',
    boxSizing: 'border-box',
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  icon: {
    width: '25px',
    height: '25px',
    marginRight: '10px'
  },
  option: {
    width: '100%',
    display: 'flex',
    fontFamily: 'Inconsolata',
    alignItems: 'center',
    border: 'none',
    height: '40px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text,
    margin: 'auto',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: 'rgba(100, 100, 100, 0.1)',
      color: props => props.theme && props.theme.text,
      transition: '0.5s'
    }
  },
  shortcut: {
    fontSize: '14px',
    display: 'block',
    opacity: '0.6',
    marginLeft: 'auto'
  },
  lockIcon: {
    margin: '2px 0px 0px 5px',
    width: '10px',
    height: '10px'
  },
  hamburgerButton: {
    marginLeft: 'auto',
    padding: '13px 10px 10px 7px'
  },
  hamburgerIcon: {
    width: '15px',
    height: '15px'
  }
});

export default EditorStyles;
