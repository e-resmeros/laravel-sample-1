import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { actions as userActions, types as userTypes } from '../ducks/user';
// services
import user from '../services/users';

// -----------------------------------------------------------------------------
// WORKERS
function* loginUser({ payload }) {
  const { formData, callback } = payload;
  try {
    const data = yield call(user.login, formData);
    if (data.error) {
      callback({ error: data.error });
    } else {
      callback({});
      yield put(
        userActions.loginSaveUser({
          user: data.data.user,
          accessToken: data.data.access_token,
        }),
      );
    }
  } catch (errs) {
    const errors = isResponseHasErrors(errs)
      ? errs.response.data.errors.map(err => ({ code: err.code, message: err.message }))
      : [{ code: errs.code ? errs.code : 'loginCatchError', message: errs.message }];

    callback({
      error: errors,
    });
  }
}

function* getAll({ payload }) {
  const { params, callback } = payload;

  try {
    const data = yield call(user.getList, params);
    if (data.error) {
      callback({ error: data.error });
    } else {
      callback({ response: data });
    }
  } catch (err) {
    callback({ errors: err.response.data.errors });
  }
}

function* changePassword({ payload }) {
    const { id, new_password, new_password_confirmation, callback } = payload;
    try {
        const data = yield call(user.changePassword, {id, new_password, new_password_confirmation});
        if (data.error) {
            callback({ error: data.error });
        } else {
            callback({});
            yield put(
                userActions.loginSaveUser({
                    user: data.data.user,
                    accessToken: data.data.access_token,
                }),
            );
        }
    } catch (errs) {
        const errors = isResponseHasErrors(errs)
            ? errs.response.data.errors.map(err => ({ code: err.code, message: err.message }))
            : [{ code: errs.code ? errs.code : 'loginCatchError', message: errs.message }];

        callback({
            error: errors,
        });
    }
}

function* unlinkDevice({ payload }) {
  const { userId, callback } = payload;
  try {
    const response = yield call(user.unlinkDevice, { user_id: userId });
    callback({ data: response.data });
  } catch (err) {
    callback({ errors: err.response.data.errors });
  }
}

function* resetPassword({ payload }) {
  const { userId, callback } = payload;
  try {
    const response = yield call(user.resetPassword, { user_id: userId });
    callback({ data: response.data });
  } catch (err) {
    callback({ errors: err.response.data.errors });
  }
}

const isResponseHasErrors = errs =>
  errs.response && errs.response.data && errs.response.data.errors;

// ----------------------------------------------------------------------------
// WATCHERS
const loginUserWatcherSaga = function* loginUserWatcherSaga() {
  yield takeLatest(userTypes.LOGIN_USER, loginUser);
};

const changePasswordWatcherSaga = function* changePasswordWatcherSaga() {
    yield takeLatest(userTypes.CHANGE_PASSWORD, changePassword);
};

const getAllUsersWatcherSaga = function* getAllUsersWatcherSaga() {
  yield takeLatest(userTypes.GET_ALL_USERS, getAll);
};

const unlinkDeviceWatcherSaga = function* unlinkDeviceWatcherSaga() {
  yield debounce(1000, userTypes.UNLINK_USER_DEVICE, unlinkDevice);
};

const resetPasswordWatcherSaga = function* resetPasswordWatcherSaga() {
  yield debounce(1000, userTypes.RESET_USER_PASSWORD, resetPassword);
};

const usersSagas = [
  loginUserWatcherSaga(),
  changePasswordWatcherSaga(),
  getAllUsersWatcherSaga(),
  unlinkDeviceWatcherSaga(),
  resetPasswordWatcherSaga(),
];

export default usersSagas;
