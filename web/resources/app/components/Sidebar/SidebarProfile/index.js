import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SidebarProfile = ({ name, position, userImage }) => (
  <div className="sidebar-profile-container">
    <img className="userImage" src={userImage} alt={`${name}'s profile`} />
    <div className="text-container">
      <span className="name">{name}</span>
      <span className="position">{position}</span>
    </div>
  </div>
);

SidebarProfile.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  userImage: PropTypes.any.isRequired,
};

export default SidebarProfile;
