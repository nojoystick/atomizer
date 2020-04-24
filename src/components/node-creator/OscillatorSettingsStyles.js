import { makeStyles } from '@material-ui/styles';

const OscillatorSettingsStyles = makeStyles({
  content: {
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '210px',
    height: '370px',
    backgroundColor: props => props.theme && props.theme.background,
    border: props => `3px solid ${props.theme && props.theme.text}`,
    opacity: '1',
    zIndex: '9999',
    fontSize: '1.2em',
    paddingTop: '0px'
  },
  vertical: {
    textAlign: 'center',
    width: '80%',
    marginBottom: '5px'
  },
  sliderLabel: {
    display: 'block',
    fontFamily: 'Roboto Condensed',
    color: props => props.theme && props.theme.text
  },
  slider: {
    width: '260px',
    marginLeft: '-100px !important',
    marginTop: '140px !important'
  },
  sliderGroup: {
    width: '50px'
  },
  input: {
    marginTop: '130px',
    marginLeft: '22px',
    width: '45px',
    fontFamily: 'Inconsolata',
    fontSize: '14px',
    border: 'none',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  }
});

export default OscillatorSettingsStyles;
