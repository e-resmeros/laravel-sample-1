import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { actions as usersActions, selectors as usersSelectors } from '../../ducks/user';

const SidebarSwal = withReactContent(Swal);

const UnauthorizedHandlerComponent = ({ history, isAuthorized, children }) => {
  // Methods
  const openUnauthorizedModal = async () => {
    const result = await SidebarSwal.fire({
      title: 'Your session has expired',
      text: 'You will be redirected to the login page!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });

    if (result.value) {
      history.push('/logout');
    }
  };

  if (isAuthorized !== undefined && !isAuthorized) {
    openUnauthorizedModal();
  }

  return <div>{children}</div>;
};

UnauthorizedHandlerComponent.propTypes = {
  history: PropTypes.any,
  isAuthorized: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthorized: usersSelectors.makeSelectUserAuthStatus(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      logoutRequest: usersActions.logout,
    },
    dispatch,
  ),
});

export const UnauthorizedHandler = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UnauthorizedHandlerComponent),
);
