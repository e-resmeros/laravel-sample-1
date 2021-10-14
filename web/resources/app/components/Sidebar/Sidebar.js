// Assets
import { Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logoImage from '../../assets/images/logo.png';
import { selectors as usersSelectors } from '../../ducks/user';
import './styles.scss';

const SidebarSwal = withReactContent(Swal);

const SidebarComponent = ({ history, user }) => {
  const openLogoutConfirmation = async () => {
    const result = await SidebarSwal.fire({
      title: 'Are you sure?',
      text: 'You will be redirected to the login page!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    });

    if (result.value) {
      history.push('/logout');
    }
  };

  return (
    <Scrollbars
      className="sidebar-container"
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMax={window.innerHeight}
    >
      <div className="logo">
        <img className="logoImage" src={logoImage} alt="MDICS" />
        <span>MDICS</span>
      </div>
      <div className="welcome">
        <span>Welcome Back,</span>
        <span className="name">{`${user.first_name} ${user.last_name}`}</span>
      </div>
      <Menu>
        <Menu.Item>
          <NavLink
            activeClassName="active-item"
            title="User Management"
            exact
            to="/admin/user-management"
          >
            <Icon type="usergroup-add" />
            <span className="title">Users</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            activeClassName="active-item"
            title="Schedule Management"
            exact
            to="/admin/schedule-management"
          >
            <Icon type="schedule" />
            <span className="title">Schedules</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item">
          <div
            className="logout-button"
            role="button"
            tabIndex="0"
            onKeyDown={event => {
              if (event.key === 'Enter') openLogoutConfirmation();
            }}
            onClick={openLogoutConfirmation}
          >
            <Icon type="logout" />
            <span className="title">Logout</span>
          </div>
        </Menu.Item>
      </Menu>
    </Scrollbars>
  );
};

const mapStateToProps = createStructuredSelector({
  user: usersSelectors.makeSelectUser(),
});

SidebarComponent.propTypes = {
  history: PropTypes.any,
  user: PropTypes.object,
};

export const Sidebar = withRouter(
  connect(
    mapStateToProps,
    null,
  )(SidebarComponent),
);
