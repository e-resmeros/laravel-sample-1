import { createAction } from 'redux-actions';

export const types = {
  GET_LATEST_SCHEDULES: 'SCHEDULE/GET_LATEST_SCHEDULES',
  UPDATE_SCHEDULE: 'SCHEDULE/UPDATE_SCHEDULE',
};

export const actions = {
  getLatestSchedules: createAction(types.GET_LATEST_SCHEDULES),
  updateSchedule: createAction(types.UPDATE_SCHEDULE),
};
