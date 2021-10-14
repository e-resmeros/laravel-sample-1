import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as userActions } from '../../ducks/user';

const Logout = ({ loginReset, history }) => {
  loginReset();
  history.push('/');
  return null;
};

Logout.propTypes = {
  loginReset: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...userActions }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Logout);
