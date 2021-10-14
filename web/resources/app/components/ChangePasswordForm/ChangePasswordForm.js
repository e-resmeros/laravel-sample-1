/* eslint-disable indent */
import { Alert, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { IoIosKey, TiArrowRight } from 'react-icons/all';
import logo from '../../assets/images/logo.png';
import { Button, Card } from '../elements';
import { TextInputField } from '../TextInputField';
import './styles.scss';

export const ChangePasswordForm = ({ onSubmit, error, isLoading }) => (
  <div className="ChangePassword">
    <div className="cp-container">
      <Card block className="custom-card">
        <div className="logo-container">
          <Row className="col-2" gutter={[0, 0]}>
            <Col span={6}>
              <img className="logo" src={logo} alt="San Miguel's Logo" />
            </Col>
            <Col span={16}>
              <span className="logo-text">MASS</span>
            </Col>
          </Row>
          <Row>Mobile Apps for Sales Supervisors</Row>
        </div>
        {error
          ? error.map(({ code, message }) => (
              <Alert message={message} type="error" showIcon key={code} />
            ))
          : null}
        <form onSubmit={onSubmit}>
          <Row className="label">Your password has been reset by the Administrator.</Row>
          <Row className="label">Please provide a new password.</Row>

          <TextInputField
            type="password"
            label="Password"
            name="password"
            icon={<IoIosKey />}
            required
          />

          <TextInputField
            type="password"
            label="Confirm Password"
            name="password_confirmation"
            icon={<IoIosKey />}
            required
          />

          <Button disabled={isLoading} primary block className="button">
            {isLoading ? (
              <Icon type="loading" />
            ) : (
              <div>
                <span>Change Password</span>
                <TiArrowRight className="icon" />
              </div>
            )}
          </Button>
        </form>
      </Card>
    </div>
  </div>
);

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.array,
  isLoading: PropTypes.bool,
};
