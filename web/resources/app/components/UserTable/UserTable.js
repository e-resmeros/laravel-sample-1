import { Button, Col, Row, Table, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './styles.scss';

const SidebarSwal = withReactContent(Swal);

export const UserTable = ({
  onReset,
  onUnlink,
  loading,
  currentUserAction,
  currentUserActionId,
  userActionLoading,
  onShowUserDetails,
  columns,
  paginatedData,
  onChange,
  ...rest
}) => {
  const [tableRef, setTableRef] = useState({
    paginated: { current: 1 },
    filters: {},
    sorter: {},
    searchedValue: null,
  });

  const { total, current_page: currentPage, data } = paginatedData;
  const pagination = { total, current: currentPage, pageSize: 10 };

  const getColumns = () => [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Function',
      dataIndex: 'function_id',
      sorter: true,
      align: 'center',
      render: (text, record) => (
        <span>
          {record.function.name} {record.primary_role.name}
        </span>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Name',
      sorter: true,
      dataIndex: 'name',
      align: 'center',
      render: (text, record) => <span>{record.appended_name}</span>,
    },
    {
      title: 'Regions',
      dataIndex: 'regions',
      align: 'center',
      render: (text, record) => (
        <span>
          {record.regions.map(region => (
            <Tag color="green">{region.name}</Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Access Type',
      dataIndex: 'access-type',
      align: 'center',
      render: (text, record) => (
        <span>
          {record.has_mobile_access && <Tag color="orange">Mobile</Tag>}
          {record.has_web_access && <Tag color="green">Web</Tag>}
          {!record.has_web_access && !record.has_mobile_access && <Tag>None</Tag>}
        </span>
      ),
    },
    {
      title: 'Actions',
      align: 'center',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Tooltip placement="top" title="Reset Password">
            <Button
              icon="rollback"
              loading={
                userActionLoading &&
                currentUserAction === 'reset' &&
                record.id === currentUserActionId
              }
              className="button"
              onClick={async () => {
                const result = await SidebarSwal.fire({
                  title: 'Are you sure?',
                  text: `${record.username}'s password will reset to default`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: "Yes, I'm sure",
                });
                if (result.value) {
                  onReset(record.id);
                }
              }}
            />
          </Tooltip>
          {record.has_mobile_access && record.device_id && (
            <Tooltip placement="top" title="Unlink Device">
              <Button
                icon="api"
                loading={
                  userActionLoading &&
                  currentUserAction === 'unlink' &&
                  record.id === currentUserActionId
                }
                className="button"
                onClick={async () => {
                  const result = await SidebarSwal.fire({
                    title: 'Are you sure?',
                    text: `${record.username}'s current device will be unlinked`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: "Yes, I'm sure",
                  });
                  if (result.value) {
                    onUnlink(record.id);
                  }
                }}
              />
            </Tooltip>
          )}
        </span>
      ),
    },
  ];

  const handleTableChange = (paginated, filters, sorter) => {
    setTableRef({ ...tableRef, paginated, filters, sorter });
    updateTable({ ...tableRef, paginated, filters, sorter });
  };

  const updateTable = ({ paginated, sorter, filters, searchedValue }) => {
    const { current: page } = paginated;
    const { field: sortField, order } = sorter;
    const sortOrder = order === undefined ? order : order.replace('end', '');

    onChange({
      page,
      sortField,
      sortOrder,
      searchedValue,
      ...filters,
    });
  };

  const handleSearch = value => {
    const searchedValue = value !== '' ? value : null;
    const params = { ...tableRef, paginated: { ...tableRef.paginated, current: 1 }, searchedValue };
    setTableRef(params);
    updateTable(params);
  };

  const renderHeader = () => {
    const totalResult = paginatedData.total ? paginatedData.total : 0;

    return (
      <Row>
        <Col span={3}>
          {totalResult} Result{totalResult > 1 ? 's' : ''} found
          {tableRef.searchedValue && (
            <span className="search-key"> for {tableRef.searchedValue}</span>
          )}
        </Col>
        <Col offset={15} span={6}>
          <Search onSearch={handleSearch} placeholder="Search user..." />
        </Col>
      </Row>
    );
  };

  return (
    <div className="user-table">
      <Table
        className="table-striped"
        rowKey={record => record.id}
        columns={getColumns(onReset, onUnlink)}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        title={renderHeader}
        {...rest}
      />
    </div>
  );
};

UserTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  userActionLoading: PropTypes.bool.isRequired,
  currentUserAction: PropTypes.string.isRequired,
  currentUserActionId: PropTypes.string.isRequired,
  columns: PropTypes.array,
  paginatedData: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onUnlink: PropTypes.func.isRequired,
  onShowUserDetails: PropTypes.func.isRequired,
};

UserTable.defaultProps = {
  paginatedData: {
    total: 0,
    current_page: 1,
    data: [],
  },
};
