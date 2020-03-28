import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const PasswordResetPage = () => {
  const theme = useSelector(state => state.network.theme);
  const classes = useStyles({theme: theme});
  console.log(classes);
  return(
    <div className={`${classes.parent} ${classes.passwordParent}`}>
      <h2>reset password</h2>
      <PasswordResetForm classes={classes}/>
    </div>
  )
};

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordResetFormBase extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className={this.classes.input}
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button className={this.classes.button} disabled={isInvalid} type="submit">
          Reset
        </button>
        {error && <p className={this.classes.message}>{error.message}</p>}
      </form>
    );
  }
}

const PasswordResetLink = ({classes}) => {
  return (
    <p className={classes.message}>
      <Link to={ROUTES.PASSWORD_RESET}>forgot password?</Link>
    </p>
  )
};

export default PasswordResetPage;

const PasswordResetForm = withFirebase(PasswordResetFormBase);

export { PasswordResetForm, PasswordResetLink };