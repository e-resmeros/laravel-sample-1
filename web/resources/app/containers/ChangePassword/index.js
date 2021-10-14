import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ChangePasswordForm } from '../../components/ChangePasswordForm';
import { actions as userActions, selectors as usersSelectors } from '../../ducks/user';

const ChangePassword = ({ user, changePassword }) => {
  // States
  const [changePasswordError, setChangePasswordError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Functions
  const onSubmit = event => {
    setChangePasswordError(null);
    event.preventDefault();
    event.persist();

    setLoading(true);
    const formData = new FormData(event.target);

    changePassword({
      id: user.id,
      new_password: formData.get('password'),
      new_password_confirmation: formData.get('password_confirmation'),
      callback: ({ error }) => {
        setLoading(false);

        if (error) {
          setChangePasswordError(error);
        }
      },
    });
  };
  return (
    <ChangePasswordForm isLoading={isLoading} error={changePasswordError} onSubmit={onSubmit} />
  );
};

ChangePassword.propTypes = {
  user: PropTypes.object,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accessToken: usersSelectors.makeSelectAccessToken(),
  user: usersSelectors.makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...userActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
