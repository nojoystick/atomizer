import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../../config';

const useNavbarStyles = makeStyles({
  titleHeader: {
    fontSize: '20px',
    padding: '10px 20px 10px 20px',
    maxWidth: '100%',
    backgroundColor: props =>
      props.screenInfo.isMobile || (props.labVisible && props.isOnHome)
        ? props.theme && props.theme.secondaryBackgroundSolid
        : 'transparent',
    color: props => props.theme && props.theme.text,
    zIndex: '2',
    position: 'relative',
    verticalAlign: 'bottom',
    transition: 'opacity 4s, background-color 0.5s, border-color 0.5s, box-shadow 0.5s',
    display: props => (props.screenInfo.isMobile ? 'flex' : 'block'),
    boxSizing: 'border-box',
    width: props =>
      props.screenInfo.isMobile
        ? '100%'
        : props.labVisible && props.isOnHome
        ? props.screenInfo.width - sizeConstants.SIDE_MENU_SIZE + 'px'
        : '100%',
    border: props =>
      (props.labVisible && props.isOnHome) || props.screenInfo.isMobile
        ? props.theme && `3px solid ${props.theme.text}`
        : '3px solid rgba(255, 255, 255, 0.0)',
    boxShadow: props =>
      ((props.labVisible && props.isOnHome) || props.screenInfo.isMobile) && props.theme && props.theme.boxShadow,
    alignItems: 'flex-end'
  },
  floatRight: {
    float: 'right'
  },
  settingsIcon: {
    margin: '0px 0px 0px 30px',
    width: '15px',
    height: '13px'
  },
  infoIcon: {
    margin: '0px 0px 0px 30px',
    width: '14px',
    height: '14px'
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    transition: 'opacity 4s'
  },
  toolbarItem: {
    marginLeft: '10px',
    padding: '10px'
  },
  active: {
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
    color: props => props.theme && props.theme.text,
    boxShadow: props => props.theme && props.theme.boxShadowLight,
    transition: '1s'
  },
  hamburgerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '0px',
    margin: '10px 10px 2px 0px',
    height: '25px'
  },
  hamburgerIcon: {
    width: '25px',
    height: '25px'
  },
  show: {
    position: 'absolute',
    left: '50px',
    top: '5px',
    width: '300px',
    marginLeft: '0px',
    opacity: '1.0',
    transition: '1s'
  },
  hide: {
    width: '300px',
    position: 'absolute',
    left: props => props.screenInfo.width,
    top: '5px',
    opacity: '0.0',
    transition: '1s'
  },
  showBurger: {
    opacity: '1.0',
    transition: '1s'
  },
  hideBurger: {
    opacity: '0.0',
    transition: '1s'
  }
});

export default useNavbarStyles;
