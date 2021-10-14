import { call, takeLatest } from 'redux-saga/effects';
import { types as dealerTypes } from '../ducks/dealers';
// services
import dealers from '../services/dealers';

// -----------------------------------------------------------------------------
// WORKERS
function* assignUserToDealer({ payload }) {
  const { userId, dealerId, callback } = payload;
  try {
    const { data, errors } = yield call(dealers.assignUserToDealer, {
      user_id: userId,
      dealer_id: dealerId,
    });
    if (errors) {
      callback({ errors });
    } else {
      callback({ data });
    }
  } catch (errs) {
    callback({
      errors: errs.response.data.errors,
    });
  }
}

function* getAllAssignDealerOptions({ payload }) {
  const { regionId, callback } = payload;
  try {
    const { data, errors } = yield call(dealers.getAllAssignDealerOptions, { region_id: regionId });
    if (errors) {
      callback({ errors });
    } else {
      callback({ data });
    }
  } catch (errs) {
    callback({
      errors: errs.response.data.errors,
    });
  }
}

function* getUserAssignedDealers({ payload }) {
  const { userId, callback } = payload;
  try {
    const { data, errors } = yield call(dealers.getUserAssignedDealers, { user_id: userId });
    if (errors) {
      callback({ errors });
    } else {
      callback({ data });
    }
  } catch (errs) {
    callback({
      errors: errs.response.data.errors,
    });
  }
}

function* deleteAssignedDealer({ payload }) {
  const { userId, dealerId, callback } = payload;
  try {
    const { data, errors } = yield call(dealers.deleteAssignedDealer, {
      user_id: userId,
      dealer_id: dealerId,
    });
    if (errors) {
      callback({ errors });
    } else {
      callback({ data });
    }
  } catch (errs) {
    callback({
      errors: errs.response.data.errors,
    });
  }
}

// ----------------------------------------------------------------------------
// WATCHERS
const getAllAssignDealerOptionsWatcherSaga = function* getAllAssignDealerOptionsWatcherSaga() {
  yield takeLatest(dealerTypes.GET_ALL_DEALERS_WITH_AREA_AND_REGION, getAllAssignDealerOptions);
};

const assignUserToDealerWatcherSaga = function* assignUserToDealerWatcherSaga() {
  yield takeLatest(dealerTypes.ASSIGN_USER_TO_DEALER, assignUserToDealer);
};

const getUserAssignedDealersWatcherSaga = function* getUserAssignedDealersWatcherSaga() {
  yield takeLatest(dealerTypes.GET_USER_SALES_DEALERS, getUserAssignedDealers);
};

const deleteAssignedDealerWatcherSaga = function* deleteAssignedDealerWatcherSaga() {
  yield takeLatest(dealerTypes.DELETE_ASSIGNED_SALES_DEALER, deleteAssignedDealer);
};

const dealersSaga = [
  getAllAssignDealerOptionsWatcherSaga(),
  assignUserToDealerWatcherSaga(),
  getUserAssignedDealersWatcherSaga(),
  deleteAssignedDealerWatcherSaga(),
];

export default dealersSaga;
