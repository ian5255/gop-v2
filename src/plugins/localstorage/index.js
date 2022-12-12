import { encrypt, decrypt } from '@/plugins/cryptoJs';

const useHash = true;

// key對應表
export const keys = {
  token: 'GOP_TOKEN', // Token
  locale: 'LOCALE' // locale
};

// 設定項目
export const SetHash = (key, value) => {
  try {
    const _key = useHash ? encrypt(key) : key;
    const _data = JSON.stringify(value);
    const _val = useHash ? encrypt(_data) : _data;
    if (_key && _val) {
      localStorage.setItem(_key, _val);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// 提取項目
export const GetHash = (key) => {
  try {
    const _key = useHash ? encrypt(key) : key;
    const _data = localStorage.getItem(_key) || '';
    const _val = useHash ? decrypt(_data) : _data;
    if (_val) {
      return JSON.parse(_val);
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

// 清除項目
export const RemoveHash = (key) => {
  try {
    const _key = useHash ? encrypt(key) : key;
    if (_key) {
      localStorage.removeItem(_key);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// 清除全部項目
export const RemoveAll = () => {
  try {
    for (const _i in keys) {
      RemoveHash(keys[_i]);
    }
    // localStorage.clear(); // 全清
  } catch (error) {
    return false;
  }
};
