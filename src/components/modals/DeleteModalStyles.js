import { makeStyles } from '@material-ui/styles';

const DeleteModalStyles = makeStyles({
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
  },
  wideButton: {
    alignSelf: 'center',
    width: '120px'
  }
});

export default DeleteModalStyles;
