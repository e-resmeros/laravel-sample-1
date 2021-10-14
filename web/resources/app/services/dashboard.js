import axios from 'axios';

const dashboard = {
  getAllRegionProfiles: async params => axios.get('/region-profile/list', { params }),
  updateRemarks: async body => axios.post('/region-profile/update-remarks', body),
};

export default dashboard;
