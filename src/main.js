import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from '@/plugins/i18n';
import antdComponents from '@/plugins/antd';
import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

// 批次掛載antd components
for (const componentEl in antdComponents) {
  app.use(antdComponents[componentEl]);
}
app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');
