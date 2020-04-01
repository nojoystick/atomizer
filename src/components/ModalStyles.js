import { makeStyles } from '@material-ui/styles';

const ModalStyles = makeStyles({
  background: {
    transition: 'opacity 1s, visibility 0s',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: props => props.theme && props.theme.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9998',
    visibility: props => (props.show ? 'visible' : 'hidden'),
    opacity: props => (props.show ? '0.6' : '0')
  },
  flexContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '9998',
    visibility: props => (props.show ? 'visible' : 'hidden'),
    opacity: props => (props.show ? '1.0' : '0.0')
  },
  content: {
    width: '350px',
    height: '200px',
    backgroundColor: 'transparent',
    opacity: '1',
    zIndex: '9999',
    margin: 'auto',
    fontSize: '1.2em'
  },
  text: {
    height: '50px',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    width: '140px',
    float: 'right'
  },
  button: {
    width: '60px',
    height: '30px',
    border: props => `1.5px solid ${props.theme && props.theme.text}`,
    color: props => props.theme && props.theme.text,
    fontFamily: 'inconsolata',
    outline: 'none',
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

export default ModalStyles;
