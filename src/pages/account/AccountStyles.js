import { makeStyles } from '@material-ui/styles';

const AccountStyles = makeStyles({
  input: {
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    borderWidth: '0px 0px 2px 0px',
    borderColor: props => props.theme && props.theme.text,
    fontFamily: 'Inconsolata',
    fontSize: '20px',
    display: 'block',
    margin: '20px'
  },
  parent: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '71%'
  },
  signUpParent: {
    height: '80%'
  },
  passwordParent: {
    height: '48%'
  },
  button: {
    width: '100px',
    height: '40px',
    backgroundColor: props => props.theme && props.theme.background,
    color: props => props.theme && props.theme.text,
    borderWidth: '2px',
    borderColor: props => props.theme && props.theme.text,
    '&:disabled': {
      visibility: 'hidden'
    }
  },
  message: {
    textAlign: 'center',
    maxHeight: '50px',
    maxWidth: '200px',
    padding: '0px',
    margin: '10px 0px 10px 0px'
  },
  offset: {
    marginLeft: '30px'
  },
  error: {
    color: props => props.theme && props.theme.alertText
  }
});

export default AccountStyles;
