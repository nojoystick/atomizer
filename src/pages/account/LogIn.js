import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from './SignUp';
import { PasswordResetLink } from './PasswordReset';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { configActions } from '../../redux/actions';

const LogIn = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({theme: theme});
  const dispatch = useDispatch();

  const setAuth = (auth) => {
    dispatch(configActions.setUser(auth))
  }
  return(
    <div className={classes.parent}>
      <h2>log in</h2>
      <LogInForm classes={classes} setAuth={setAuth}/>
      <PasswordResetLink classes={classes} />
      <SignUpLink classes={classes}/>
    </div>
  )
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LogInFormBase extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.firebase.auth.onAuthStateChanged(auth => {
          this.props.setAuth(auth);
        })
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
        <form onSubmit={this.onSubmit}>
          <input
            className={this.classes.input}
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="email"
          />
          <input
            className={this.classes.input}
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="password"
          />
          <button className={this.classes.button} disabled={isInvalid} type="submit">
            Sign In
          </button>
          {error && <p className={`${this.classes.message} ${this.classes.offset}`}>login error, check your username and password and try again</p>}
        </form>
    );
  }
}
const LogInForm = compose(
  withRouter,
  withFirebase,
)(LogInFormBase);
export default LogIn;
export { LogInForm };