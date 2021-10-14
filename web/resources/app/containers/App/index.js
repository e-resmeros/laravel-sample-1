import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../Login/Loadable';
import AdminPage from '../Admin/Loadable';
import LogoutPage from '../Logout/Loadable';
import ChangePasswordPage from '../ChangePassword/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import CommonRoute from './hoc/CommonRoute';
import GlobalStyle from '../../global-styles';

import 'antd/dist/antd.css';

const loading = () => <div>Loading...</div>;

export default function App() {
  return (
    <div>
      <React.Suspense fallback={loading()}>
        <Switch>
          {/* Login */}
          <CommonRoute exact path="/" component={LoginPage} />

          {/* ChangePassword */}
          <CommonRoute path="/change-password" component={ChangePasswordPage} />

          {/* Admin */}
          <CommonRoute path="/admin" component={AdminPage} />

          {/* Page Not Found */}
          <Route path="/logout" component={LogoutPage} />

          {/* Page Not Found */}
          <Route component={NotFoundPage} />
        </Switch>
      </React.Suspense>
      <GlobalStyle />
    </div>
  );
}
