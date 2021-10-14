import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginForm } from '../../components';
import { actions as userActions } from '../../ducks/user';

const Login = ({ login }) => {
  // States
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Functions
  const onSubmit = event => {
    setLoginError(null);
    event.preventDefault();
    event.persist();

    setLoading(true);
    const formData = new FormData(event.target);

    login({
      formData,
      callback: ({ error }) => {
        setLoading(false);

        if (error) {
          setLoginError(error);
        }
      },
    });
  };

  return <LoginForm error={loginError} isLoading={isLoading} onSubmit={onSubmit} />;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...userActions }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
