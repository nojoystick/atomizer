import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const NodeDetailStyles = makeStyles({
  nodeDetailPanel: {
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: props => props.theme && props.theme.text,
    borderWidth: '3px 3px 0px 3px',
    height: props =>
      `${
        props.nodeDetailVisible
          ? props.menuVisible
            ? props.screenInfo.height - sizeConstants.BOTTOM_MENU_SIZE - sizeConstants.HEADER_SIZE + 21 + 'px'
            : sizeConstants.BOTTOM_MENU_SIZE + 'px'
          : '0px'
      }`,
    right: props =>
      `${
        props.screenInfo.width < props.screenInfo.breakpoint
          ? '-3px'
          : props.sideMenuVisible
          ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px'
          : '0px'
      }`,
    bottom: props =>
      `${
        props.menuVisible
          ? props.nodeDetailVisible
            ? sizeConstants.BOTTOM_MENU_SIZE - 13 + 'px'
            : sizeConstants.BOTTOM_MENU_SIZE - 16 + 'px'
          : '-10px'
      }`,
    width: props => `${props.screenInfo.width < props.screenInfo.breakpoint ? '100%' : '350px'}`,
    margin: '0px',
    transition: '0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    overflowY: 'scroll',
    zIndex: '2'
  },
  nodeHeader: {
    padding: '5px',
    display: 'block'
  },
  bigNodeTitle: {
    padding: '5px',
    display: 'block',
    fontSize: '1.5em'
  },
  placeholder: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s',
    opacity: '0'
  },
  placeholderText: {
    fontStyle: 'italic',
    fontSize: '1.2em',
    color: props => props.theme && props.theme.secondary,
    height: '0px',
    justifySelf: 'center',
    alignSelf: 'center'
  },
  nodeToolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0',
    transition: '0.5s',
    visibility: 'hidden'
  },
  show: {
    opacity: '1',
    visibility: 'visible'
  },
  scrollButton: {
    flexGrow: '1',
    height: '100px',
    border: 'none',
    backgroundColor: props => props.theme && props.theme.background,
    outline: 'none',
    '&:hover': {
      opacity: '0.4'
    }
  },
  scrollIcon: {
    width: '20px',
    height: '10px'
  }
});

export default NodeDetailStyles;
