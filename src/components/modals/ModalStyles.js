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
    opacity: props => (props.show ? '0.8' : '0')
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
  }
});

export default ModalStyles;
