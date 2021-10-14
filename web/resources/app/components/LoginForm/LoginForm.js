/* eslint-disable indent */
import { Alert, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { IoIosKey, MdMailOutline, TiArrowRight } from 'react-icons/all';
import logo from '../../assets/images/logo.png';
import { Button, Card } from '../elements';
import { TextInputField } from '../TextInputField';
import './styles.scss';

export const LoginForm = ({ onSubmit, error, isLoading }) => (
  <div className="Login">
    <div className="login-container">
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
          <TextInputField label="Username" name="username" icon={<MdMailOutline />} required />
          <TextInputField
            type="password"
            label="Password"
            name="password"
            icon={<IoIosKey />}
            required
          />

          <Button disabled={isLoading} primary block className="button">
            {isLoading ? (
              <Icon type="loading" />
            ) : (
              <div>
                <span>Sign In</span>
                <TiArrowRight className="icon" />
              </div>
            )}
          </Button>
        </form>
      </Card>
    </div>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.array,
  isLoading: PropTypes.bool,
};
