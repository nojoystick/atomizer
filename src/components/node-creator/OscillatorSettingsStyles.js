import { makeStyles } from '@material-ui/styles';

const OscillatorSettingsStyles = makeStyles({
  content: {
    margin: '15px',
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => `3px solid ${props.theme && props.theme.text}`,
    opacity: '1',
    zIndex: '9999',
    fontSize: '1.2em',
    padding: '0px 0px 10px 0px'
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
  }
});

export default OscillatorSettingsStyles;
