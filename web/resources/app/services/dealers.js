import axios from 'axios';

const dealers = {
  getAllAssignDealerOptions: async params => axios.get('/dealer/list/assign-options', { params }),
  getUserAssignedDealers: async params => axios.get('/sales-dealer/user', { params }),
  assignUserToDealer: async body => axios.post('/sales-dealer/assign-user', body),
  deleteAssignedDealer: async body => axios.post('/sales-dealer/delete', body),
};

export default dealers;
