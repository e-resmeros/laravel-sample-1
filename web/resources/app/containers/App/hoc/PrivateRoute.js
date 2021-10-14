import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import userTypes from 'globals/userTypes';

const PrivateRoute = ({ userType, ...rest }) => <Route {...rest} />;

PrivateRoute.propTypes = {
  userType: PropTypes.oneOf([userTypes.SUPERADMIN, userTypes.COORDINATOR, userTypes.ADMIN]),
  forUserType: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string,
};

PrivateRoute.defaultProps = {
  userType: userTypes.ALL,
  // forUserType: PropTypes.string.isRequired,
  // render: PropTypes.func.isRequired,
  // path: PropTypes.string.isRequired,
};

// const mapStateToProps = store => ({
//   // userType: getUserType(store),
//   // isFreeUser: getIsFreeUser(store),
//   // studentBoarded: getUserStudentBoarded(store),
// });

export default withRouter(
  connect(
    null,
    null,
  )(PrivateRoute),
);
