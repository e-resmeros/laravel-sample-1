import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const types = {
  LOGIN_USER: 'LOGIN/LOGIN_USER',
  CHANGE_PASSWORD: 'USER/CHANGE_PASSWORD',
  CHANGE_UNAUTHORIZED_STATUS: 'USER/CHANGE_UNAUTHORIZED_STATUS',
  LOGIN_SAVE_USER: 'LOGIN/LOGIN_SAVE_USER',
  LOGIN_RESET: 'LOGIN/LOGIN_RESET',
  GET_ALL_USERS: 'USERS/FETCH_PAGINATED_USERS',
  RESET_USER_PASSWORD: 'USERS/RESET_USER_PASSWORD',
  UNLINK_USER_DEVICE: 'USERS/UNLINK_USER_DEVICE',
};

export const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  isUserAuthorized: true,
};

export const reducer = handleActions(
  {
    [types.LOGIN_SAVE_USER]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    }),

    [types.CHANGE_UNAUTHORIZED_STATUS]: (state, { payload }) => ({
      ...state,
      isUserAuthorized: payload.isUserAuthorized,
    }),

    [types.LOGIN_RESET]: () => initialState,
  },
  initialState,
);

export const actions = {
  login: createAction(types.LOGIN_USER),
  changePassword: createAction(types.CHANGE_PASSWORD),
  changeAuthorizedStatus: createAction(types.CHANGE_UNAUTHORIZED_STATUS),
  loginSaveUser: createAction(types.LOGIN_SAVE_USER),
  loginReset: createAction(types.LOGIN_RESET),
  getAll: createAction(types.GET_ALL_USERS),
  resetPassword: createAction(types.RESET_USER_PASSWORD),
  unlinkDevice: createAction(types.UNLINK_USER_DEVICE),
};

const selectUser = state => state.users || initialState;
export const selectors = {
  makeSelectUser: () =>
    createSelector(
      selectUser,
      state => state.user,
    ),

  makeSelectAccessToken: () =>
    createSelector(
      selectUser,
      state => state.accessToken,
    ),

  makeSelectRefreshToken: () =>
    createSelector(
      selectUser,
      state => state.refreshToken,
    ),

  makeSelectUserAuthStatus: () =>
    createSelector(
      selectUser,
      state => state.isUserAuthorized,
    ),
};

export default reducer;
