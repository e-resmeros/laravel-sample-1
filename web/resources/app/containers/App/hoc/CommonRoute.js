import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectors as usersSelectors } from '../../../ducks/user';

const CommonRoute = ({ location, accessToken, user, ...rest }) => {
  const { pathname: pathName } = location;

  if (pathName === '/' && accessToken && user.reset_flag === 1) {
    return <Route render={() => <Redirect to="/change-password" />} />;
  }

  if (pathName === '/change-password' && accessToken && user.reset_flag === 0) {
    return <Route render={() => <Redirect to="/admin/user-management" />} />;
  }

  if (pathName === '/' && accessToken) {
    return <Route render={() => <Redirect to="/admin/user-management" />} />;
  }

  if (pathName === '/admin' && accessToken) {
    return <Route render={() => <Redirect to="/admin/user-management" />} />;
  }

  if (pathName.includes('/admin') && accessToken === null) {
    return <Route render={() => <Redirect to="/" />} />;
  }

  return <Route {...rest} />;
};

CommonRoute.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
  accessToken: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  accessToken: usersSelectors.makeSelectAccessToken(),
  user: usersSelectors.makeSelectUser(),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(CommonRoute),
);
