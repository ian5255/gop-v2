import axios from 'axios';
import fn from '@/plugins/axios/setting/fn';
import config from '@/plugins/axios/setting/config';
import stack from '@/plugins/axios/setting/stack.js';

// Get Store
const axiosIns = axios.create(config.basic);
const axiosUploadFile = axios.create(config.formData);
const axiosDownloadFile = axios.create(config.downloadFile);
// 回傳攔截
axiosIns.interceptors.response.use(
  (response) => fn.HandleSuccessRes(response),
  (error) => fn.HandleErrorRes(error)
);
// axiosUploadFile回傳攔截
axiosUploadFile.interceptors.response.use(
  (response) => fn.HandleSuccessRes(response),
  (error) => fn.HandleErrorRes(error)
);
// ==============================================================================
/**
 * Get method
 * @param { string } uri
 * @param { Object } Params
 * @param { Object } headers
 */
const Get = (uri, Params, useMask = false, headers) => {
  const stackId = stack.GetStackItemId(uri);
  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosIns
      .get(`${uri}${fn.ToQuerystr(Params)}`, { headers })
      .then((response) => {
        resolve(response);
        stack.RemoveStackItem(stackId);
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
      });
  });
};

// -----------------------
/**
 * Post method
 * @param { string } uri
 * @param { Object } Params
 * @param { boolean } useMask
 * @param { Object } headers
 */
const Post = (uri, Params, useMask = false, headers) => {
  const stackId = stack.GetStackItemId(uri);

  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosIns
      .post(uri, JSON.stringify(Params), { headers })
      .then((response) => {
        resolve(response);
        stack.RemoveStackItem(stackId);
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
      });
  });
};

// -----------------------
/**
 * Delete method
 * @param { string } uri
 * @param { Object } Params
 * @param { boolean } useMask
 * @param { Object } headers
 */
const Put = (uri, Params, useMask = false, headers) => {
  const stackId = stack.GetStackItemId(uri);
  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosIns
      .put(uri, JSON.stringify(Params), { headers })
      .then((response) => {
        resolve(response);
        stack.RemoveStackItem(stackId);
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
      });
  });
};

// -----------------------
/**
 * Delete method
 * @param { string } uri
 * @param { Object } Params
 * @param { boolean } useMask
 * @param { Object } headers
 */
const Delete = (uri, Params, useMask = false, headers) => {
  const stackId = stack.GetStackItemId(uri);
  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosIns
      .delete(uri + fn.ToQuerystr(Params), { headers })
      .then((response) => {
        resolve(response);
        stack.RemoveStackItem(stackId);
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
      });
  });
};

/**
 * Download CSV
 * @param { String } uri
 * @param { Object } params
 * @param { String } fileName
 * @param { Object } headers
 */
const PostDownloadCSV = (uri, params = {}, fileName, useMask = false) => {
  const stackId = stack.GetStackItemId(uri);
  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosDownloadFile
      .post(uri, JSON.stringify(params))
      .then((response) => {
        if (response.data.status) {
          return resolve({ status: { isPass: false } });
        }
        // const blob = new Blob([response.data], { type: "application/csv" });
        // const link = document.createElement("a");
        // link.href = window.URL.createObjectURL(blob);
        // link.setAttribute("download", `${fileName}.csv`);
        // link.click();

        // https://mydnic.be/post/nuxt-how-to-force-download-a-file-from-an-api-endpoint

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.setAttribute(
          'href',
          'data:text/csv;charset=utf-8,%EF%BB%BF' +
            encodeURIComponent(response.data)
        );
        link.setAttribute('download', `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        stack.RemoveStackItem(stackId);
        return resolve({ status: { isPass: true } });
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
        return resolve({ status: { isPass: false } });
      });
  });
};

/**
 * Post method
 * @param { string } uri
 * @param { Object } params
 * @param { Object } headers
 */
const PostUploadFile = function (uri, params, useMask = false, headers) {
  const stackId = stack.GetStackItemId(uri);
  if (useMask) {
    stack.AddStackItem(stackId);
  }
  return new Promise((resolve) => {
    axiosUploadFile
      .post(uri, fn.ToFormData(params), { headers })
      .then((response) => {
        resolve(response);
        stack.RemoveStackItem(stackId);
      })
      .catch(() => {
        stack.RemoveStackItem(stackId);
      });
  });
};

const Mock = (data, sec) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, sec);
  });

export { Get, Post, Put, Delete, PostDownloadCSV, PostUploadFile, Mock };
