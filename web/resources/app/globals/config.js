export const BASENAME = '/mass';

let API_URL = `http://13.54.148.67${BASENAME}/api`;
if (process.env.NODE_ENV === 'staging') {
  API_URL = `http://13.54.148.67${BASENAME}/api`;
} else if (process.env.NODE_ENV === 'production') {
  API_URL = `http://mass.com/api`;
}

const config = { API_URL };

export default config;
