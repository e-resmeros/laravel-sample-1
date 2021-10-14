import { Button, Col, Icon, Input, Row, Table, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './styles.scss';

export const DashboardTable = ({
  loading,
  columns,
  paginatedData,
  currentActionId,
  remarks,
  onEdit,
  onSave,
  onCancel,
  onRemarksChange,
  userActionLoading,
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
  const pagination = { total, current: currentPage };

  const getColumns = () => [
    {
      title: 'Area',
      dataIndex: 'region.area.name',
      align: 'center',
    },
    {
      title: 'Region',
      dataIndex: 'region.name',
      align: 'center',
    },
    {
      title: 'Submitted Count',
      dataIndex: 'submitted_count',
      align: 'center',
      render: (text, record) => <span>{`${record.submitted_count}/${record.dealer_count}`}</span>,
    },
    {
      title: 'Deleted Count',
      dataIndex: 'deleted_count',
      align: 'center',
      render: (text, record) => <span>{`${record.deleted_count}/${record.dealer_count}`}</span>,
    },
    {
      title: 'Submitted Status',
      dataIndex: 'submitted_status',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <span>
          {record.submitted_count === record.dealer_count ? (
            <Icon type="check" />
          ) : (
            <Icon type="close" />
          )}
        </span>
      ),
    },

    {
      title: 'Deleted Status',
      dataIndex: 'deleted_status',
      align: 'center',
      width: '15%',
      render: (text, record) => (
        <span>
          {record.deleted_count === record.dealer_count ? (
            <Icon type="check" />
          ) : (
            <Icon type="close" />
          )}
        </span>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      align: 'center',
      width: '20%',
      render: (text, record) => (
        <span>
          {record.id.toString() === currentActionId ? (
            <Input
              value={remarks}
              maxLength={191}
              onChange={e => {
                onRemarksChange(e.target.value);
              }}
              placeholder="Input remarks"
              disabled={userActionLoading}
            />
          ) : (
            <span>{record.remarks}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      render: (text, record) => (
        <span>
          {currentActionId && currentActionId === record.id.toString() && (
            <span className="action-buttons">
              <Tooltip placement="top" title="Save">
                <Button
                  icon="save"
                  className="button"
                  onClick={() => {
                    onSave(record.id);
                  }}
                  loading={userActionLoading}
                />
              </Tooltip>
              <Tooltip placement="top" title="Cancel">
                <Button icon="close" className="button" onClick={onCancel} />
              </Tooltip>
            </span>
          )}
          {currentActionId !== record.id.toString() && (
            <Tooltip placement="top" title="Edit Remarks">
              <Button
                icon="edit"
                className="button"
                onClick={() => onEdit(record.id, record.remarks)}
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
          <Search onSearch={handleSearch} placeholder="Search..." />
        </Col>
      </Row>
    );
  };

  return (
    <div className="dashboard-table">
      <Table
        className="table-striped"
        rowKey={record => record.id}
        columns={getColumns()}
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

DashboardTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  columns: PropTypes.array,
  paginatedData: PropTypes.object,
  remarks: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  userActionLoading: PropTypes.bool.isRequired,
  currentActionId: PropTypes.string.isRequired,
  onRemarksChange: PropTypes.func.isRequired,
};

DashboardTable.defaultProps = {
  paginatedData: {
    total: 0,
    current_page: 1,
    data: [],
  },
};
