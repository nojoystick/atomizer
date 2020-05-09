import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const PlayerStyles = makeStyles({
  player: {
    width: props =>
      props.screenInfo && props.screenInfo.isMobile
        ? '100%'
        : props.labVisible && props.screenInfo.width < 1200
        ? props.screenInfo.width - sizeConstants.SIDE_MENU_SIZE + 'px'
        : '450px',
    height: '80px',
    border: props => props.theme && `3px solid ${props.theme.text}`,
    backgroundColor: props => props.theme && props.theme.background,
    position: 'absolute',
    zIndex: '100000',
    boxSizing: 'border-box',
    pointerEvents: 'auto',
    visibility: 'visible',
    display: 'flex',
    alignItems: 'center',
    boxShadow: props => props.theme && props.theme.boxShadow,
    overflowX: 'auto',
    overflowY: 'hidden',
    transition: '0.5s'
  },
  block: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0px 10px',
    alignItems: 'center'
  },
  rowNoPadding: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '15px',
    height: '25px',
    backgroundColor: props => props.theme && props.theme.background,
    border: 'none',
    padding: '0px',
    boxSizing: 'border-box',
    '&:hover': {
      opacity: '0.4'
    }
  },
  stopButton: {
    marginLeft: '20px'
  },
  playIcon: {
    width: '15px',
    height: '17px'
  },
  stopIcon: {
    width: '15px',
    height: '15px'
  },
  sliderGroup: {
    display: 'inline-block',
    marginLeft: '10px',
    padding: '5px 5px 0px 5px',
    width: '140px'
  },
  sliderLabel: {
    display: 'inline-block',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    color: props => props.theme && props.theme.text
  },
  input: {
    marginLeft: '30px',
    width: '45px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  },
  slider: {
    width: '120px',
    display: 'inline',
    marginBottom: '20px'
  },
  parent: {
    margin: '15px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => props.theme && `3px solid ${props.theme.text}`
  },
  short: {
    width: '120px',
    height: '75px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  med: {
    width: '220px',
    height: '75px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  last: {
    marginRight: '0px',
    marginLeft: 'auto'
  },
  centeredContent: {
    marginTop: '30px'
  },
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  msContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    paddingRight: '10px'
  },
  ms: {
    width: '30px',
    height: '30px',
    backgroundColor: 'transparent',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    padding: '0px',
    fontFamily: 'Inconsolata',
    fontSize: '18px',
    fontWeight: '600',
    '&:hover': {
      opacity: '0.6'
    }
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
  }
});

export default PlayerStyles;
