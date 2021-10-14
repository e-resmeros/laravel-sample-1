import { call, takeLatest } from 'redux-saga/effects';
import { types as dashboardTypes } from '../ducks/dashboard';
// services
import dashboard from '../services/dashboard';

// -----------------------------------------------------------------------------
// WORKERS
function* getAllRegionProfiles({ payload }) {
  const { params, callback } = payload;
  try {
    const { data, errors } = yield call(dashboard.getAllRegionProfiles, params);
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

function* updateRemarks({ payload }) {
  const { regionProfileId, remarks, callback } = payload;
  try {
    const { data, errors } = yield call(dashboard.updateRemarks, {
      region_profile_id: regionProfileId,
      remarks,
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
const getAllRegionProfilesWatcherSaga = function* getAllRegionProfilesWatcherSaga() {
  yield takeLatest(dashboardTypes.GET_ALL_REGION_PROFILES, getAllRegionProfiles);
};

const updateRemarksWatcherSaga = function* updateRemarksWatcherSaga() {
  yield takeLatest(dashboardTypes.UPDATE_REMARKS, updateRemarks);
};
const dealersSaga = [getAllRegionProfilesWatcherSaga(), updateRemarksWatcherSaga()];

export default dealersSaga;
