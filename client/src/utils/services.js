export const API_URL = 'http://localhost:3001';
export const FIND_URL = '/find/';
export const DOWNLOAD_URL = '/download';

const apiCall = (url = '') =>
  fetch(`${API_URL}${url}`).then((res) => {
    return res.json();
  });

export const apiCallDownload = (url = '') =>
  fetch(`${API_URL}${url}`).then((res) => {
    return res.blob();
  });

export default apiCall;
