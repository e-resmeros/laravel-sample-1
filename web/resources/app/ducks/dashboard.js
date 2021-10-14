import { createAction } from 'redux-actions';

export const types = {
  GET_ALL_REGION_PROFILES: 'DASHBOARD/GET_ALL_REGION_PROFILES',
  UPDATE_REMARKS: 'DASHBOARD/UPDATE_REMARKS',
};

export const actions = {
  getAllRegionProfiles: createAction(types.GET_ALL_REGION_PROFILES),
  updateRemarks: createAction(types.UPDATE_REMARKS),
};
