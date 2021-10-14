import { all } from 'redux-saga/effects';
// sagas
import usersSagas from './users';
import dealersSagas from './dealers';
import dashboardSagas from './dashboard';
import scheduleSaga from './schedule';

export default function* rootSaga() {
  yield all([...usersSagas, ...dealersSagas, ...dashboardSagas, ...scheduleSaga]);
}
