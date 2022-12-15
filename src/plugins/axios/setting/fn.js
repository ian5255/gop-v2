// let $i18n;
// let $antd;
// let $storage;

// 回傳成功
const HandleSuccessRes = (response) => {
  //  資料格式異常
  if (!response?.data?.status?.code) {
    // if ($i18n && $antd?.aNotification) {
    //   $antd.aNotification.error({ message: 'API 回傳格式異常' });
    // }
    return {
      data: null,
      status: {
        errLevel: 2,
        isPass: false,
        details: [],
        message: 'API 回傳格式異常',
        emessage: ''
      }
    };
  }

  // api code
  const { message, details, code } = response.data.status;
  console.log(message);
  const _code = Number(code.split('-')[0]);
  // ok
  response.data.status.errLevel = _code; // api 錯誤等級
  response.data.status.isPass = true; // api 是否成功
  // 錯誤訊息
  // let _errMagDetails = '';
  if (details) {
    // _errMagDetails = details.join('\n');
  }
  // 錯誤的api狀態碼
  if (_code !== 0) {
    response.data.status.isPass = false; // api 失敗
    // 錯誤訊息
    // if ($antd?.aNotification) {
    //   switch (_code) {
    //     case 1:
    //       $antd.aNotification.warning({ message, description: `code: ${code}\n${_errMagDetails}` });
    //       break;
    //     case 2:
    //     case 3:
    //       $antd.aNotification.error({ message, description: `code: ${code}\n${_errMagDetails}` });
    //       break;
    //   }
    // }
  }

  // // token 過期、登出
  // if (`${response.data.status.code}` === '2-002-005-07') {
  //   response.data.status.isPass = false; // api 失敗
  //   // console.log("err", $storage);
  //   if ($storage) {
  //     $storage.RemoveAll();
  //   }
  //   setTimeout(() => {
  //     window.location.href = '/'; // token 異常，登出
  //   }, 3000);
  // }

  return response.data;
};

// 回傳失敗
const HandleErrorRes = (error) => {
  // CloseMask();
  if (error.response && error.response.status) {
    const code = Number(error.response.status);

    // if ($i18n && $antd?.aNotification) {
    //   $antd.aNotification.error({ message: `${$i18n.t(code)} (${code})` });
    // }

    return {
      data: null,
      status: {
        errLevel: 2,
        isPass: false,
        details: [`${code} 網路異常`],
        message: '',
        emessage: '',
        i18nMsg: `NetworkErr.${code}`
      }
    };
  }

  // if ($i18n && $antd?.aNotification) {
  //   $antd.aNotification.error({ message: `${$i18n.t('err.100002')} (100002)` });
  // }

  // 未知異常
  return {
    data: null,
    status: {
      errLevel: 2,
      isPass: false,
      details: ['未知異常'],
      message: '',
      emessage: '',
      i18nMsg: 'NetworkErr.100002'
    }
  };
};

// Object 轉換為 query
const ToQuerystr = (obj) => {
  if (!obj) return '';
  return `?${Object.entries(obj)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&')}`;
};

/**
 * 轉換為FormData格式
 * @param { Object } Params
 */
const ToFormData = (Params) => {
  const data = new FormData();
  Object.keys(Params).forEach((key) => {
    if (isArray(Params[key])) {
      if (Params[key].length !== 0)
        Params[key].forEach((v) => data.append(key, v));
    } else data.append(key, Params[key]);
  });
  return data;
};

/**
 * 是否為 Array
 * @param { Array } arr
 * @returns { Boolean }
 */
const isArray =
  Array.isArray ||
  function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

export default {
  HandleSuccessRes,
  HandleErrorRes,
  ToQuerystr,
  ToFormData
};
