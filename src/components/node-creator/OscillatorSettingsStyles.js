import { makeStyles } from '@material-ui/styles';

const OscillatorSettingsStyles = makeStyles({
  content: {
    margin: '15px',
    padding: '10px 15px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => `3px solid ${props.theme && props.theme.text}`,
    opacity: '1',
    fontSize: '1.2em',
    boxShadow: props => props.theme && props.theme.boxShadow
  },
  envelope: {
    flexDirection: 'row',
    height: '220px'
  },
  sliderGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 0px'
  },
  sliderLabel: {
    display: 'inline-block',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    color: props => props.theme && props.theme.text
  },
  smallLabel: {
    margin: '0px !important',
    fontSize: '14px',
    fontWeight: '600'
  },
  input: {
    position: 'absolute',
    top: '15px',
    right: '5%',
    width: '50px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    color: props => props.theme && props.theme.text
  },
  row: {
    display: 'flex',
    width: '100%'
  },
  verticalSliderGroup: {
    width: '70px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  verticalSlider: {
    position: 'absolute',
    top: '110px',
    margin: '0px !important'
  },
  verticalLabel: {
    margin: '0px !important',
    position: 'absolute',
    top: '10px'
  },
  verticalInput: {
    position: 'absolute',
    top: '180px',
    width: '50px',
    marginLeft: '5px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.secondaryBackground,
    color: props => props.theme && props.theme.text
  },
  disabled: {
    filter: 'brightness(50%)'
  }
});

export default OscillatorSettingsStyles;
