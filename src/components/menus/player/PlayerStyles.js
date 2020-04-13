import { makeStyles } from '@material-ui/styles';

const PlayerStyles = makeStyles({
  player: {
    width: '500px',
    height: '80px',
    border: props => props.theme && `3px solid ${props.theme.text}`,
    backgroundColor: props => props.theme && props.theme.background,
    position: 'absolute',
    zIndex: '8000',
    pointerEvents: 'auto',
    visibility: 'visible',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    margin: '0px 10px 0px 10px',
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
    outline: 'none',
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
  dropdown: {
    width: '50px',
    maxWidth: '60px',
    height: '18px !important',
    minHeight: '18px !important',
    fontFamily: 'Inconsolata',
    fontWeight: '800',
    zIndex: '3',
    borderWidth: '0px 0px 2px 0px !important',
    borderColor: `${props => props.theme && props.theme.text} $important`,
    outline: 'none !important',
    boxShadow: 'none !important',
    padding: '0px !important',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    display: 'inline',
    '&:hover': {
      borderColor: `${props => props.theme && props.theme.text} !important`,
      outline: 'none'
    },
    '> & span': {
      width: '23px'
    },
    '& div': {
      '& input': {
        color: props => props.theme && props.theme.text
      }
    }
  },
  parent: {
    display: 'flex',
    justifyContent: 'center'
  },
  row: {
    marginTop: '10px',
    borderStyle: 'solid',
    border: props => `3px solid ${props.theme && props.theme.text}`,
    width: '350px',
    height: '75px',
    margin: '0px',
    transition: '0.5s',
    backgroundColor: props => props.theme && props.theme.background,
    zIndex: '2'
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
  }
});

export default PlayerStyles;
