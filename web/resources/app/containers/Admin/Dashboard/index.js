import { Radio } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DashboardTable, Header } from '../../../components';
import { actions as dashboardActions } from '../../../ducks/dashboard';
import { selectors as usersSelectors } from '../../../ducks/user';
import './styles.scss';

const DashboardComponent = ({ user, getAllRegionProfiles, updateRemarks }) => {
  const [loading, setLoading] = useState(false);
  const [paginatedData, setPaginatedData] = useState({});
  const [assignmentSelected, setAssignmentSelected] = useState(2);
  const [currentActionId, setCurrentActionId] = useState('');
  const [remarks, setRemarks] = useState('');
  const [searchParams, setSearchParams] = useState(null);
  const [userActionLoading, setUserActionLoading] = useState(false);

  useEffect(() => {
    if (user.function_id === 1) {
      setAssignmentSelected(2);
    } else {
      setAssignmentSelected(user.function.assignment_id);
    }
    getAllPaginatedRegionProfiles({ page: 1 });
  }, []);

  useEffect(() => {
    getAllPaginatedRegionProfiles({ page: 1 });
  }, [assignmentSelected]);

  const updatePaginatedData = ({ data, errors }) => {
    setLoading(false);
    if (data) {
      setPaginatedData(data);
    }
    if (errors) {
      console.log(errors);
    }
  };

  const getAllPaginatedRegionProfiles = (params = {}) => {
    setLoading(true);
    setSearchParams({ ...params, pageSize: 10, assignment_id: assignmentSelected });
    getAllRegionProfiles({
      params: { ...params, pageSize: 10, assignment_id: assignmentSelected },
      callback: ({ data, errors }) => updatePaginatedData({ data, errors }),
    });
  };

  const onEdit = (id, currentRemarks) => {
    setRemarks(currentRemarks);
    setCurrentActionId(id.toString());
  };

  const onCancel = () => {
    setCurrentActionId('');
  };

  const onRemarksChange = newValue => {
    setRemarks(newValue);
  };

  const onSave = id => {
    setUserActionLoading(true);

    updateRemarks({
      regionProfileId: id,
      remarks,
      callback: ({ data, errors }) => {
        setRemarks('');
        setCurrentActionId('');
        setUserActionLoading(false);

        if (data) {
          getAllPaginatedRegionProfiles(searchParams);
        }
        if (errors) {
          console.log(errors);
        }
      },
    });
  };

  return (
    <div className="dashboard-component">
      <Header title="Dashboard" icon="dashboard" />

      {user.function_id === 1 && (
        <Radio.Group
          className="selection"
          value={assignmentSelected}
          onChange={e => {
            setAssignmentSelected(e.target.value);
          }}
          style={{ marginBottom: 16 }}
          buttonStyle="solid"
        >
          <Radio.Button className="button" value={2}>
            Finance and Logistics
          </Radio.Button>
          <Radio.Button className="button" value={3}>
            Sales
          </Radio.Button>
        </Radio.Group>
      )}

      <div className="content">
        <DashboardTable
          remarks={remarks}
          onSave={onSave}
          onCancel={onCancel}
          onEdit={onEdit}
          onRemarksChange={onRemarksChange}
          userActionLoading={userActionLoading}
          currentActionId={currentActionId}
          paginatedData={paginatedData}
          loading={loading}
          onChange={getAllPaginatedRegionProfiles}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: usersSelectors.makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getAllRegionProfiles: dashboardActions.getAllRegionProfiles,
      updateRemarks: dashboardActions.updateRemarks,
    },
    dispatch,
  ),
});

DashboardComponent.propTypes = {
  user: PropTypes.object.isRequired,
  getAllRegionProfiles: PropTypes.func.isRequired,
  updateRemarks: PropTypes.func.isRequired,
};

export const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardComponent);
