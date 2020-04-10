import { makeStyles } from '@material-ui/styles';

const NodeCreatorModalStyles = makeStyles({
  flexContainer: {
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& > div': {
      margin: '10px'
    }
  },
  effectsContainer: {
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'hidden',
    padding: '10px',
    height: '505px',
    border: props => `3px solid ${props.theme && props.theme.text}`
  },
  content: {
    position: 'relative',
    width: props => (props.screenInfo.width < 600 ? '100%' : '600px'),
    height: props => (props.screenInfo.width < 600 ? '100%' : '400px'),
    backgroundColor: props => props.theme && props.theme.background,
    border: props => `3px solid ${props.theme && props.theme.text}`,
    opacity: '1',
    zIndex: '9999',
    fontSize: '1.2em'
  },
  title: {
    color: props => props.theme && props.theme.text,
    padding: '5px'
  },
  text: {
    height: '50px',
    backgroundColor: 'transparent',
    color: props => props.theme && props.theme.text
  },
  buttonContainer: {
    width: '140px',
    position: 'absolute',
    bottom: '5px',
    right: '5px'
  },
  button: {
    width: '60px',
    height: '30px',
    border: props => `1.5px solid ${props.theme && props.theme.text}`,
    fontFamily: 'inconsolata',
    outline: 'none',
    '&:hover': {
      opacity: '0.4'
    }
  },
  confirmButton: {
    marginLeft: '20px',
    fontWeight: '700',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text
  },
  cancelButton: {
    fontWeight: '400',
    backgroundColor: props => props.theme && props.theme.secondary
  }
});

export default NodeCreatorModalStyles;
