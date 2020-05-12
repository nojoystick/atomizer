import { makeStyles } from '@material-ui/styles';
import { sizeConstants } from '../../config';

const LabStyles = makeStyles({
  lab: {
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    right: props => (props.labVisible ? '0px' : '-6px'),
    width: props => (props.labVisible ? sizeConstants.SIDE_MENU_SIZE + 'px' : '0px'),
    height: '100%',
    bottom: '0px',
    borderLeft: props => props.theme && `3px solid ${props.theme.text}`,
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'width 0.5s, height 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    zIndex: 8001,
    overflowY: 'auto',
    overflowX: 'hidden',
    boxShadow: props => props.labVisible && props.theme && `-10px 0px 10px ${props.theme.boxShadowColor}`
  },
  labMobile: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    left: '0px',
    boxSizing: 'border-box',
    bottom: props => (props.labVisible ? '0px' : '-6px'),
    width: '100%',
    height: props => (props.labVisible ? sizeConstants.BOTTOM_MENU_SIZE + 'px' : '0px'),
    borderTop: props => props.theme && `3px solid ${props.theme.text}`,
    margin: '0px',
    transition: 'width 0.5s, height 0.5s',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    zIndex: 8001,
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  effectsContainer: {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '10px',
    height: '505px',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  content: {
    margin: '15px',
    padding: '15px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    width: '100%',
    backgroundColor: props => props.theme && props.theme.background,
    overflow: 'hidden',
    opacity: '1',
    zIndex: '9999',
    fontSize: '1.2em',
    minHeight: '565px',
    height: '565px',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  title: {
    color: props => props.theme && props.theme.text,
    padding: '10px',
    fontSize: '20px'
  },
  text: {
    height: '50px',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: props => props.theme && props.theme.text
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5px',
    right: '5px'
  },
  button: {
    width: '60px',
    height: '30px',
    border: props => `1.5px solid ${props.theme && props.theme.text}`,
    color: props => props.theme && props.theme.text,
    fontFamily: 'Inconsolata',
    '&:hover': {
      opacity: '0.4'
    }
  },
  confirmButton: {
    marginLeft: '20px',
    fontWeight: '700',
    backgroundColor: props => props.theme && props.theme.background
  },
  cancelButton: {
    justifySelf: 'flex-end',
    fontWeight: '400',
    backgroundColor: props => props.theme && props.theme.secondary
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '15px'
  },
  automationFooter: {
    justifyContent: 'flex-end'
  },
  header: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  subheader: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  top: {
    display: 'flex',
    flexDirection: 'column'
  },
  active: {
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
    color: props => props.theme && props.theme.text,
    boxShadow: props => props.theme && props.theme.boxShadowLight,
    transition: '1s'
  },
  elementOptionDropdown: {
    position: 'absolute',
    right: props => `${props.dropdownRight}px`,
    top: props => `${props.dropdownTop}px`,
    zIndex: 9999,
    boxShadow: props => props.theme && props.theme.boxShadow,
    backgroundColor: props => props.theme && props.theme.secondaryBackgroundSolid
  },
  optionButton: {
    color: props => props.theme && props.theme.text,
    fontFamily: 'Inconsolata',
    fontWeight: '900',
    backgroundColor: 'transparent',
    padding: '10px',
    border: 'none',
    '&:hover': {
      opacity: '0.6'
    }
  }
});

export default LabStyles;
