// Persisted redux config
// import localforage from 'localforage';
import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = {
  key: 'reactjs_rgtc_base',
  storage,
  blacklist: ['_persist', 'router'],
  keyPrefix: '',
};

export default persistConfig;
