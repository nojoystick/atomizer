import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase} from '../../firebase'
import * as ROUTES from '../../constants/routes';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

const SignUp = () => {
    const theme = useSelector(state => state.network.theme);
    const useStyles = makeStyles({
      input: {
        backgroundColor: theme.background,
        color: theme.text,
        borderWidth: '0px 0px 2px 0px',
        borderColor: theme.text,
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
        height: '65%'
        },
      button: {
        width: '100px',
        height: '40px',
        backgroundColor: theme.background,
        color: theme.text,
        border: `2px solid ${theme.text}`,
        '&:disabled':{
            visibility: 'hidden'
        }
      },
      message: {
          maxHeight: '200px',
          maxWidth: '200px'
      }
    });
  const classes = useStyles();
  return(
    <div className={`${classes.parent} ${classes.signUpParent}`}>
        <h2>sign up</h2>
        <SignUpForm classes={classes}/>
    </div>
  )
};

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = { ...INITIAL_STATE };

  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className={this.classes.input}
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="username"
        />
        <input
          className={this.classes.input}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="email address"
        />
        <input
          className={this.classes.input}
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="password"
        />
        <input
          className={this.classes.input}
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="confirm password"
        />
        <button className={this.classes.button} disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p className={`${this.classes.message} ${this.classes.offset}`}>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = ({classes}) => {
  return (
    <p className={classes.message}>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
};

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUp;
export { SignUpForm, SignUpLink };