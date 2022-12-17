import NormalDialog from '@/components/module/Dialog/NormalDialogTemplate';
import { render, h } from 'vue';

const dialogObj = {
  normal: NormalDialog
};
// const defConfig = {
//   okText: "確定離開",
//   cancelText: "停留此頁",
//   showOk: true,
//   showCancel: true,
//   cancelType: "secondary",
//   okType: "primary",
//   maskClose: true,
//   texts: [],
//   textAlign: "center",
//   smallText: [],
//   notices: []
// };

// 參考：http://soiiy.com/Vue-js/16544.html
// -----------------
const renderDialog = (type, setConfig, resolve) => {
  const config = {
    okText: '確定離開',
    cancelText: '停留此頁',
    showOk: true,
    showCancel: true,
    cancelType: 'secondary',
    okType: 'primary',
    maskClose: true,
    texts: [],
    textAlign: 'center',
    smallText: [],
    notices: []
  };
  for (const key in setConfig) {
    config[key] = setConfig[key];
  }
  Object.freeze(config);
  const el = document.createElement('div');
  document.body.appendChild(el);
  const handleDestroy = () => {
    // 从 body 上移除组件
    render(null, document.body);
  };
  // 使用 h 函数创建 vnode
  const vnode = h(dialogObj[type], {
    config,
    onOk: () => {
      resolve('ok');
      handleDestroy();
      el.remove();
    },
    onCancel: () => {
      resolve('cancel');
      handleDestroy();
      el.remove();
    },
    onClose: () => {
      resolve('close');
      handleDestroy();
      el.remove();
    }
  });
  console.log(7878, vnode);

  // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
  render(vnode, document.body);
};

export function normal (setConfig = {}) {
  return new Promise((resolve) => renderDialog('normal', setConfig, resolve));
}
