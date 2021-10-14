import axios from 'axios';

const schedule = {
  getLatestSchedules: async params => axios.get('/inventory/schedules', { params }),
  updateSchedule: async body => axios.post('/inventory/update-schedule', body),
};

export default schedule;
