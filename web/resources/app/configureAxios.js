/* eslint-disable dot-notation */
import axios from 'axios';
import configuration from './globals/config';
import message from './globals/messages';
import { isNetworkError } from './utils/network';
import { actions as usersActions } from './ducks/user';

export default function configureAxios(store) {
  axios.defaults.baseURL = configuration.API_URL;
  axios.defaults.timeout = 5000; // 5 Seconds

  axios.interceptors.request.use(
    config => {
      const requestConfig = { ...config };
      const { users } = store.getState();

      if (users.accessToken) {
        requestConfig.headers['Authorization'] = `Bearer ${users.accessToken}`;
      }
      return requestConfig;
    },
    error => Promise.reject(error),
  );

  axios.interceptors.response.use(
    config => config,
    error => {
      let modifiedError = { ...error };
      if (isNetworkError(error)) {
        modifiedError = {
          ...modifiedError,
          ...{
            response: {
              data: {
                errors: [{ code: 'E9907', message: message.E9907 }],
              },
            },
          },
        };
      } else if (error.response.status === 401) {
        store.dispatch(usersActions.changeAuthorizedStatus({ isUserAuthorized: false }));
      }

      return Promise.reject(modifiedError);
    },
  );
}
