import React, { useEffect, useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, DatePicker, Input, notification, Radio } from 'antd';
import { Header, Loading } from '../../../components';
import { actions as scheduleActions } from '../../../ducks/schedule';
import { AssignmentType, DEFAULT_DATE_FORMAT } from '../../../globals/variables';
import messages from '../../../globals/messages';

const ScheduleManagementComponent = ({ getLatestSchedules, updateSchedule }) => {
  const [assignmentSelected, setAssignmentSelected] = useState(AssignmentType.FINLOG);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [finlogSchedule, setFinlogSchedule] = useState(null);
  const [salesSchedule, setSalesSchedule] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLatestSchedules({ callback: onRetrieveSchedules });
  }, []);

  const onChangeSelectedSchedule = e => {
    setAssignmentSelected(e.target.value);
    switch (e.target.value) {
      case AssignmentType.FINLOG: {
        setSelectedSchedule(finlogSchedule);
        setEndDate(moment(finlogSchedule.allowed_end_at));
        break;
      }
      case AssignmentType.SALES: {
        setSelectedSchedule(salesSchedule);
        setEndDate(moment(salesSchedule.allowed_end_at));
        break;
      }

      default: {
        setSelectedSchedule(finlogSchedule);
        setEndDate(moment(finlogSchedule.allowed_end_at));
      }
    }
  };

  const onRetrieveSchedules = response => {
    const { finlog, sales } = response.data;
    if (response) {
      setSelectedSchedule(finlog);
      setEndDate(moment(finlog.allowed_end_at));
      setFinlogSchedule(finlog);
      setSalesSchedule(sales);
    }
    setLoading(false);
  };

  const onUpdateSchedule = response => {
    if (response) {
      notification.success({
        message: messages.label.MSG_SUCCESS_SCHEDULE_UPDATE_TITLE,
        description: messages.label.MSG_SUCCESS_SCHEDULE_UPDATE_DESC,
        placement: 'bottom-right',
      });
    }
    const updatedSchedule = { ...selectedSchedule, allowed_end_at: response.data.allowed_end_at };
    setSelectedSchedule(updatedSchedule);
    switch (assignmentSelected) {
      case AssignmentType.FINLOG: {
        setFinlogSchedule(updatedSchedule);
        break;
      }
      case AssignmentType.SALES: {
        setSalesSchedule(updatedSchedule);
        break;
      }

      default: {
        setFinlogSchedule(updatedSchedule);
      }
    }
    setSubmitting(false);
  };

  const onChangeEndDate = date => {
    setEndDate(date);
  };

  const validateEndDate = () => {
    if (!endDate) {
      setEndDateError(messages.label.MSG_REQUIRED);
      return false;
    }
    const startDate = moment(selectedSchedule.allowed_start_at);
    const isBefore = endDate.isBefore(startDate);
    if (isBefore) {
      setEndDateError(messages.label.MSG_END_DATE_EARLIER);
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    setEndDateError('');
    if (validateEndDate()) {
      setSubmitting(true);
      updateSchedule({
        scheduleId: selectedSchedule.id,
        endDate,
        callback: onUpdateSchedule,
      });
    }
  };
  return (
    <div className="schedule-management-component">
      <Header title="Schedules" icon="schedule" />
      {loading ? (
        <Loading />
      ) : (
        <div className="inventory-schedule-content">
          <Radio.Group
            className="selection"
            value={assignmentSelected}
            onChange={onChangeSelectedSchedule}
            style={{ marginBottom: 16 }}
            buttonStyle="solid"
          >
            <Radio.Button className="button" value={AssignmentType.FINLOG}>
              Finance and Logistics
            </Radio.Button>
            <Radio.Button className="button" value={AssignmentType.SALES}>
              Sales
            </Radio.Button>
          </Radio.Group>
          <div className="schedule-form">
            <form>
              <div className="form-item ">
                <span className="form-item-label">Schedule :</span>
                <Input
                  disabled
                  className="form-item-field"
                  value={selectedSchedule.assignment.name}
                />
              </div>
              <div className="form-item ">
                <span className="form-item-label">Inventory Date :</span>
                <DatePicker
                  disabled
                  className="form-item-field"
                  value={moment(selectedSchedule.inventory_date)}
                  format={DEFAULT_DATE_FORMAT}
                />
              </div>
              <div className="form-item ">
                <span className="form-item-label">Allowed Start Date :</span>
                <DatePicker
                  disabled
                  className="form-item-field"
                  value={moment(selectedSchedule.allowed_start_at)}
                  format={DEFAULT_DATE_FORMAT}
                />
              </div>
              <div className="form-item ">
                <span className="form-item-label">Allowed End Date :</span>
                <DatePicker
                  disabled={isSubmitting}
                  className="form-item-field"
                  defaultValue={endDate}
                  value={endDate}
                  format={DEFAULT_DATE_FORMAT}
                  onChange={onChangeEndDate}
                />
              </div>
              <span className="error">{endDateError}</span>
              <Button loading={isSubmitting} className="submit-button" onClick={onSubmit}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getLatestSchedules: scheduleActions.getLatestSchedules,
      updateSchedule: scheduleActions.updateSchedule,
    },
    dispatch,
  ),
});

ScheduleManagementComponent.propTypes = {
  getLatestSchedules: PropTypes.func,
  updateSchedule: PropTypes.func,
};

export const ScheduleManagement = connect(
  null,
  mapDispatchToProps,
)(ScheduleManagementComponent);
