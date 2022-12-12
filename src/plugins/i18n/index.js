import { createI18n } from 'vue-i18n';
import { GetHash, keys } from '@/plugins/localstorage';

// 加載語言包
const LoadLocaleMessages = async () => {
  const _message = {};
  const locales = import.meta.glob('./locales/*.js', { import: 'default' });
  for (const filePath in locales) {
    const localeKey = filePath.replace('./locales/', '').replace('.js', '');
    await locales[filePath]().then((mod) => {
      _message[localeKey] = mod;
    });
  }
  return _message;
};

const i18n = createI18n({
  legacy: false,
  locale: GetHash(keys.locale) ? GetHash(keys.locale) : 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: await LoadLocaleMessages()
});

export default i18n;
