import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import history from '../utils/history';
import usersReducer from './user';

// -----------------------------------------------------------------------------
// ROUTER NAMES
export const USERS = 'users';

// -----------------------------------------------------------------------------
// REDUCER
const rootReducer = combineReducers({
  router: connectRouter(history),
  [USERS]: usersReducer,
});

export default rootReducer;
