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
        props.menuVisible
          ? props.screenInfo.height - sizeConstants.BOTTOM_MENU_SIZE - sizeConstants.HEADER_SIZE + 21 + 'px'
          : sizeConstants.BOTTOM_MENU_SIZE + 'px'
      }`,
    right: props =>
      `${props.screenInfo.isMobile ? '-3px' : props.sideMenuVisible ? sizeConstants.SIDE_MENU_SIZE - 5 + 'px' : '0px'}`,
    bottom: props => `${props.menuVisible ? sizeConstants.BOTTOM_MENU_SIZE - 13 + 'px' : '-10px'}`,
    width: props => `${props.screenInfo.isMobile ? '100%' : '350px'}`,
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
    '&:hover': {
      opacity: '0.4'
    }
  },
  scrollIcon: {
    width: '20px',
    height: '10px'
  },
  sliderGroup: {
    position: 'relative',
    padding: '0px 0px 10px 0px'
  },
  sliderLabel: {
    margin: '15px 0px 0px 20px',
    display: 'inline-block',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    color: props => props.theme && props.theme.text
  },
  input: {
    position: 'absolute',
    top: '15px',
    right: '40px',
    width: '50px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    color: props => props.theme && props.theme.text,
    boxShadow: 'none !important',
    padding: '0px !important',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  },
  msButtonBar: {
    width: '100%',
    margin: '10px 0px 0px 0px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      margin: '0px 20px'
    }
  }
});

export default NodeDetailStyles;
