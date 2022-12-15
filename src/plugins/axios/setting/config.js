// import { GetHash } from "@/plugins/cookie/fn";
import { GetHash, keys } from '@/plugins/localstorage';
const basic = {
  method: 'post',
  baseURL: '/api/bgm/', // "/api/bgm", // process.env.baseUrl
  transformRequest: [
    (data, headers) => {
      const token = GetHash(keys.token);
      headers['Content-Type'] = 'application/json';
      headers['Authorization'] = token ? `Bearer ${token}` : '';
      return data;
    }
  ],
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  // 攜帶憑證
  withCredentials: false,
  // 返回資料型別
  responseType: 'json'
};

// file form-data =======================================================================
const formData = {
  method: 'post',
  baseURL: '/api/bgm/',
  transformRequest: [
    function (data, headers) {
      const token = GetHash(keys.token);
      headers['Content-Type'] = 'multipart/form-data';
      headers['Authorization'] = token ? `Bearer ${token}` : '';
      return data;
    }
  ],
  // 攜帶憑證
  withCredentials: false
  // 返回資料型別
};

const downloadFile = {
  method: 'post',
  baseURL: '/api/bgm/',
  transformRequest: [
    function (data, headers) {
      const token = GetHash(keys.token);
      headers['Content-Type'] = 'multipart/form-data';
      headers['Authorization'] = token ? `Bearer ${token}` : '';
      return data;
    }
  ],
  // 攜帶憑證
  withCredentials: false
};

const config = {
  basic,
  formData,
  downloadFile
};

export default config;
