import { createAction } from 'redux-actions';

export const types = {
  ASSIGN_USER_TO_DEALER: 'DEALERS/ASSIGN_USER_TO_DEALER',
  GET_USER_SALES_DEALERS: 'DEALERS/GET_USER_SALES_DEALERS',
  DELETE_ASSIGNED_SALES_DEALER: 'DEALERS/DELETE_ASSIGNED_SALES_DEALER',
  GET_ALL_DEALERS_WITH_AREA_AND_REGION: 'DEALERS/GET_ALL_DEALERS_WITH_AREA_AND_REGION',
};

export const actions = {
  assignUserToDealer: createAction(types.ASSIGN_USER_TO_DEALER),
  getUserAssignedDealers: createAction(types.GET_USER_SALES_DEALERS),
  deleteAssignedDealer: createAction(types.DELETE_ASSIGNED_SALES_DEALER),
  getAllAssignDealerOptions: createAction(types.GET_ALL_DEALERS_WITH_AREA_AND_REGION),
};
