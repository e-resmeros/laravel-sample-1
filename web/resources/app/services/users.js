import axios from 'axios';

const user = {
    login: async body => axios.post('/auth/login/web', body),
    changePassword: async body => axios.post('/user/change-password', body),
    getList: async params => axios.get('/user/list', {params}),
    resetPassword: async body => axios.post('/user/reset-password', body),
    unlinkDevice: async body => axios.post('/user/unlink-device', body),
};

export default user;
