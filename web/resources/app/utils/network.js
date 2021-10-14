export const isNetworkError = err => err.isAxiosError && !err.response;
