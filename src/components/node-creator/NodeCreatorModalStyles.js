import { makeStyles } from '@material-ui/styles';

const NodeCreatorModalStyles = makeStyles({
  flexContainer: {
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 120px)',
    overflow: 'scroll',
    '& > div': {
      margin: '10px'
    }
  },
  columnParent: {
    display: 'flex',
    flexDirection: 'column'
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
    display: 'flex',
    alignContent: 'center',
    width: props => (props.screenInfo.width < 600 ? 'unset' : '600px'),
    height: props => (props.screenInfo.width < 600 ? '400px' : '400px'),
    backgroundColor: props => props.theme && props.theme.background,
    border: props => `3px solid ${props.theme && props.theme.text}`,
    overflow: 'scroll',
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
    fontWeight: '400',
    backgroundColor: props => props.theme && props.theme.secondary
  }
});

export default NodeCreatorModalStyles;
