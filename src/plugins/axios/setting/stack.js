// Get Store
let store;
if (process.client) {
  window.onNuxtReady(({ context, $store }) => {
    store = $store;
  });
}

// api 棧池
const apiStackList = [];
// const taskTimer = 0;

// 取得stackItemId
const GetStackItemId = (apiRouter) => {
  const nowTime = new Date().getTime();
  const randomCode = Math.floor(Math.random() * 100000);
  return `${apiRouter}${nowTime}${randomCode}`;
};

// 加入棧項目
const AddStackItem = (itemId) => {
  apiStackList.push(itemId);
  if (store) {
    store.commit('system/ToggleLoadingMask', true);
  }
};

// 移除棧項目
const RemoveStackItem = (itemId) => {
  const _index = apiStackList.findIndex((e) => (e === itemId));
  if (_index < 0) return;
  apiStackList.splice(_index, 1);
  if (apiStackList.length > 0) return;
  if (store) {
    store.commit('system/ToggleLoadingMask', false);
  }
};

export default {
  apiStackList,
  GetStackItemId,
  AddStackItem,
  RemoveStackItem
};
