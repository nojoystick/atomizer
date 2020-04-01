import { makeStyles } from '@material-ui/styles';

const PlayerStyles = makeStyles({
  player: {
    width: '400px',
    height: '80px',
    border: props => props.theme && `3px solid ${props.theme.text}`,
    backgroundColor: props => props.theme && props.theme.background,
    position: 'absolute',
    zIndex: '8000',
    pointerEvents: 'auto',
    visibility: 'visible'
  },
  button: {
    width: '50px',
    height: '48px',
    backgroundColor: props => props.theme && props.theme.background,
    border: 'none',
    outline: 'none',
    padding: '0px',
    boxSizing: 'border-box',
    '&:hover': {
      opacity: '0.4'
    }
  },
  playIcon: {
    width: '15px',
    height: '17px'
  },
  stopIcon: {
    width: '15px',
    height: '15px',
    marginRight: '20px'
  },
  sliderGroup: {
    display: 'inline-block',
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
    outline: 'none',
    border: 'none',
    display: 'inline-block',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  },
  slider: {
    width: '120px',
    display: 'inline'
  }
});

export default PlayerStyles;
