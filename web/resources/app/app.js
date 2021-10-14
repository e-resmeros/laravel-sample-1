// Needed for redux-saga es6 generator support
// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/favicon/favicon.ico';
import '@babel/polyfill';
import { ConnectedRouter } from 'connected-react-router';
import 'file-loader?name=.htaccess!./.htaccess';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// Import Theme Provider
import { ThemeProvider } from 'styled-components';
import configureAxios from './configureAxios';
/* eslint-enable import/no-unresolved, import/extensions */
import configureStore from './configureStore';
// Import root app
import App from './containers/App';
import history from './utils/history';

require('bootstrap');

// Extract our Sass variables into a JS object
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./scss/_variables.scss');

// Create redux store with history
const store = configureStore({}, history);
configureAxios(store);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
    document.getElementById('app'),
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
