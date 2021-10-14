import { call, takeLatest } from 'redux-saga/effects';
import { types as scheduleTypes } from '../ducks/schedule';
// services
import schedule from '../services/schedule';
import { DEFAULT_DATE_FORMAT } from '../globals/variables';

// -----------------------------------------------------------------------------
// WORKERS
function* updateSchedule({ payload }) {
  const { scheduleId, endDate, callback } = payload;
  try {
    const { data, errors } = yield call(schedule.updateSchedule, {
      schedule_id: scheduleId,
      allowed_end_at: endDate.format(DEFAULT_DATE_FORMAT),
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

function* getSchedules({ payload }) {
  const { callback } = payload;
  try {
    const { data, errors } = yield call(schedule.getLatestSchedules);
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

// WATCHERS
const getSchedulesWatcherSaga = function* getAllAssignDealerOptionsWatcherSaga() {
  yield takeLatest(scheduleTypes.GET_LATEST_SCHEDULES, getSchedules);
};

const updateScheduleWatcherSaga = function* getAllAssignDealerOptionsWatcherSaga() {
  yield takeLatest(scheduleTypes.UPDATE_SCHEDULE, updateSchedule);
};
// ----------------------------------------------------------------------------
const scheduleSaga = [getSchedulesWatcherSaga(), updateScheduleWatcherSaga()];

export default scheduleSaga;
