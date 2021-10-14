import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Sidebar, UnauthorizedHandler } from '../../components';
import { Container } from '../../components/elements';
import './styles.scss';
import { UserManagement } from './UserManagement';
import { ScheduleManagement } from './ScheduleManagement';

export * from './UserManagement';
const { Sider, Content } = Layout;

const loading = () => <div>Loading...</div>;

const Admin = () => (
  <UnauthorizedHandler>
    <Layout className="admin-container">
      <Sider collapsible className="sider">
        <Sidebar />
      </Sider>
      <Content className="content">
        <Container>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/admin/user-management" component={UserManagement} />
              <Route exact path="/admin/schedule-management" component={ScheduleManagement} />
            </Switch>
          </React.Suspense>
        </Container>
      </Content>
    </Layout>
  </UnauthorizedHandler>
);

export default Admin;
