import { Alert, Button, Cascader, Col, List, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Header, UserTable } from '../../../components';
import { TextView } from '../../../components/TextView/TextView';
import { actions as dealerActions } from '../../../ducks/dealers';
import { actions as userActions } from '../../../ducks/user';
import './styles.scss';

const SidebarSwal = withReactContent(Swal);

const UserManagementComponent = ({
  getAll,
  resetPassword,
  unlinkDevice,
  getAllAssignDealerOptions,
  assignUserToDealer,
  getUserAssignedDealers,
  deleteAssignedDealer,
}) => {
  const [loading, setLoading] = useState(false);
  const [paginatedData, setPaginatedData] = useState({});
  const [userActionLoading, setUserActionLoading] = useState(false);
  const [currentUserActionId, setCurrentUserActionId] = useState('');
  const [currentUserAction, setCurrentUserAction] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [options, setOptions] = useState([]);
  const [userDetailsError, setUserDetailsError] = useState(null);
  const [isShowingUserDetails, setShowingUserDetails] = useState(false);
  const [currentDealerSelected, setCurrentDealerSelected] = useState(null);
  const [assignUserToDealerLoading, setAssignUserToDealerLoading] = useState(false);
  const [userSalesDealers, setUserSalesDealers] = useState([]);
  const [userSalesDealerLoading, setUserSalesDealerLoading] = useState(false);
  const [deleteSalesDealerLoading, setDeleteSalesDealerLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    getAllPaginatedUser({ page: 1 });
  }, []);

  const updatePaginatedData = response => {
    if (response) {
      setPaginatedData(response.data);
    }
    setLoading(false);
  };

  const getAllPaginatedUser = (params = {}) => {
    setLoading(true);
    setSearchParams({ ...params, pageSize: 10 });
    getAll({
      params: { ...params, pageSize: 10 },
      callback: ({ response }) => updatePaginatedData(response),
    });
  };

  const onShowUserDetails = user => {
    setUserSalesDealerLoading(true);
    getAllAssignDealerOptions({
      regionId: user.region_id,
      callback: ({ data, errors }) => {
        if (data) {
          setOptions(data.options);
        }
        if (errors) {
          setUserDetailsError(`${errors[0].code}: ${errors[0].message}`);
        }
      },
    });
    getUserAssignedDealers({
      userId: user.id,
      callback: ({ data, errors }) => {
        setUserSalesDealerLoading(false);
        if (data) {
          setUserSalesDealers(data.sales_dealers);
        }
        if (errors) {
          setUserDetailsError(`${errors[0].code}: ${errors[0].message}`);
        }
      },
    });
    setCurrentUser(user);
    setShowingUserDetails(true);
  };

  const onCloseUserDetails = () => {
    setCurrentUser(null);
    setShowingUserDetails(false);
    setCurrentDealerSelected(null);
    setUserDetailsError(null);
  };

  const onReset = userId => {
    setUserActionLoading(true);
    setCurrentUserActionId(userId.toString());
    setCurrentUserAction('reset');

    resetPassword({
      userId,
      callback: async ({ data, errors }) => {
        setUserActionLoading(false);
        if (data) {
          SidebarSwal.fire({
            title: 'Success',
            text: 'User password has been reset',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          });
        }
        if (errors) {
          const result = await SidebarSwal.fire({
            title: 'Failed',
            text: `${errors[0].code}: ${errors[0].message}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Try again',
          });

          if (result.value) {
            onReset(userId);
          }
        }
      },
    });
  };

  const onUnlink = userId => {
    setUserActionLoading(true);
    setCurrentUserActionId(userId);
    setCurrentUserAction('unlink');

    unlinkDevice({
      userId,
      callback: async ({ data, errors }) => {
        setUserActionLoading(false);
        if (data) {
          getAllPaginatedUser(searchParams);
          SidebarSwal.fire({
            title: 'Success',
            text: 'User device has been unlinked',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          });
        }
        if (errors) {
          const result = await SidebarSwal.fire({
            title: 'Failed',
            text: `${errors[0].code}: ${errors[0].message}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Try again',
          });

          if (result.value) {
            onUnlink(userId);
          }
        }
      },
    });
  };

  const onFilter = (inputValue, path) =>
    path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

  const onChange = value => {
    setCurrentDealerSelected(value[2]);
  };

  const onAssignUserToDealer = () => {
    if (currentDealerSelected) {
      setAssignUserToDealerLoading(true);
      setUserSalesDealerLoading(true);
      assignUserToDealer({
        userId: currentUser.id,
        dealerId: currentDealerSelected,
        callback: ({ data, errors }) => {
          setAssignUserToDealerLoading(false);
          setUserSalesDealerLoading(false);
          if (data) {
            setUserDetailsError(null);
            setUserSalesDealers(data.sales_dealers);
          }
          if (errors) {
            setUserDetailsError(`${errors[0].code}: ${errors[0].message}`);
          }
        },
      });
    } else if (!currentUser) {
      setUserDetailsError('No user selected');
    } else if (!currentDealerSelected) {
      setUserDetailsError('No dealer selected');
    }
  };

  const onDeleteSalesDealer = dealerId => {
    if (dealerId) {
      setDeleteSalesDealerLoading(true);
      setUserSalesDealerLoading(true);

      deleteAssignedDealer({
        userId: currentUser.id,
        dealerId,
        callback: ({ data, errors }) => {
          setDeleteSalesDealerLoading(false);
          setUserSalesDealerLoading(false);
          if (data) {
            setUserSalesDealers(data.sales_dealers);
          }
          if (errors) {
            setUserDetailsError(`${errors[0].code}: ${errors[0].message}`);
          }
        },
      });
    } else if (!currentUser) {
      setUserDetailsError('No user selected');
    } else if (!dealerId) {
      setUserDetailsError('No dealer selected');
    }
  };
  return (
    <div>
      <Header title="Users" icon="usergroup-add" />
      <div className="users-content">
        <UserTable
          currentUserAction={currentUserAction}
          currentUserActionId={currentUserActionId}
          userActionLoading={userActionLoading}
          onShowUserDetails={onShowUserDetails}
          onReset={onReset}
          onUnlink={onUnlink}
          paginatedData={paginatedData}
          loading={loading}
          onChange={getAllPaginatedUser}
        />

        {currentUser && (
          <Modal
            className="users-management-modal"
            width={currentUser.function.name === 'Sales' ? 800 : 400}
            visible={isShowingUserDetails}
            title={`${currentUser.first_name} ${currentUser.last_name}'s Details`}
            onCancel={onCloseUserDetails}
            footer={null}
          >
            {userDetailsError && (
              <Alert
                className="alert-message"
                type="error"
                message={userDetailsError}
                showIcon
                closable
                onClose={() => {
                  setUserDetailsError(null);
                }}
              />
            )}

            <Row gutter={16} type="flex">
              <Col span={currentUser.function.name === 'Sales' ? 12 : 24}>
                <span className="title">User Information</span>
                <TextView title="Employee Number" value={`${currentUser.id}`} />
                <TextView title="First name" value={`${currentUser.first_name}`} />
                <TextView title="Middle name" value={`${currentUser.middle_name}`} />
                <TextView title="Last name" value={`${currentUser.last_name}`} />
                <TextView
                  title="Region"
                  value={`${currentUser.region ? currentUser.region.name : null}`}
                />
                <TextView
                  title="Function"
                  value={`${currentUser.function.name} ${currentUser.primary_role.name}`}
                />
                {currentUser.function.name === 'Sales' && (
                  <div className="assign-dealers">
                    <span className="title">Assign a dealer</span>
                    <div className="add-container">
                      <Cascader
                        className="cascader"
                        options={options}
                        onChange={onChange}
                        placeholder="Please select"
                        showSearch={{
                          filter: onFilter,
                        }}
                      />
                      <Button
                        icon="plus"
                        onClick={onAssignUserToDealer}
                        loading={assignUserToDealerLoading}
                      />
                    </div>
                  </div>
                )}
              </Col>
              <Col span={12}>
                {currentUser.function.name === 'Sales' && (
                  <div className="assign-dealers">
                    <span className="title">Assigned dealers</span>
                    <Scrollbars
                      autoHide
                      autoHideTimeout={1000}
                      autoHideDuration={200}
                      autoHeight
                      autoHeightMax={275}
                    >
                      <List
                        itemLayout="horizontal"
                        dataSource={userSalesDealers}
                        loading={userSalesDealerLoading}
                        renderItem={item => (
                          <List.Item className="list-item">
                            <span>{item.appended_name}</span>
                            <Button
                              loading={
                                currentDealerSelected === item.id && deleteSalesDealerLoading
                              }
                              className="delete-button"
                              onClick={() => {
                                onDeleteSalesDealer(item.id);
                              }}
                              shape="circle"
                              type="danger"
                              icon="delete"
                            />
                          </List.Item>
                        )}
                      />
                    </Scrollbars>
                  </div>
                )}
              </Col>
            </Row>
          </Modal>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getAll: userActions.getAll,
      resetPassword: userActions.resetPassword,
      unlinkDevice: userActions.unlinkDevice,
      getAllAssignDealerOptions: dealerActions.getAllAssignDealerOptions,
      assignUserToDealer: dealerActions.assignUserToDealer,
      getUserAssignedDealers: dealerActions.getUserAssignedDealers,
      deleteAssignedDealer: dealerActions.deleteAssignedDealer,
    },
    dispatch,
  ),
});

UserManagementComponent.propTypes = {
  getAll: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  unlinkDevice: PropTypes.func.isRequired,
  getAllAssignDealerOptions: PropTypes.func.isRequired,
  assignUserToDealer: PropTypes.func.isRequired,
  getUserAssignedDealers: PropTypes.func.isRequired,
  deleteAssignedDealer: PropTypes.func.isRequired,
};

export const UserManagement = connect(
  null,
  mapDispatchToProps,
)(UserManagementComponent);
