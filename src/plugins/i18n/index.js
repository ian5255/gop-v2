import { createI18n } from 'vue-i18n';

const messages = {};
const messages1 = new Promise((resolve) => {
  const _messages1 = {};
  const locales = import.meta.glob('./locales/*.js', { import: 'default' });
  for (const filePath in locales) {
    const localeKey = filePath.replace('./locales/', '').replace('.js', '');
    // messages[localeKey] = await new Promise((resolve) => {
    //   resolve(locales[filePath]().then((mod) => mod.default));
    // });
    console.log(1);
    locales[filePath]().then((mod) => {
      console.log(2);
      // console.log(44, Object.keys(locales), filePath, mod.default);
      // Object.assign(messages, { [localeKey]: mod.default });
      _messages1[localeKey] = mod;
    });
    console.log(3);
  }
  return resolve(_messages1);
});
// const messages1 = {};
// (async function () {
//   const locales = import.meta.glob('./locales/*.js', { import: 'default' });
//   for (const filePath in locales) {
//     const localeKey = filePath.replace('./locales/', '').replace('.js', '');
//     // messages[localeKey] = await new Promise((resolve) => {
//     //   resolve(locales[filePath]().then((mod) => mod.default));
//     // });
//     console.log(1);
//     await locales[filePath]().then((mod) => {
//       console.log(2);
//       // console.log(44, Object.keys(locales), filePath, mod.default);
//       // Object.assign(messages, { [localeKey]: mod.default });
//       messages1[localeKey] = mod;
//     });
//     console.log(3);
//   }
// }());

const LoadLocaleMessages = () => {
  const locales = import.meta.glob('./locales/*.js', { import: 'default' });
  // Object.keys(locales).forEach((key) => {
  //   const localeKey = key.replace('./locales/', '').replace('.js', '');
  //   locales[key]().then((mod) => {
  //     messages[localeKey] = mod.default;
  //   });
  // });
  for (const filePath in locales) {
    const localeKey = filePath.replace('./locales/', '').replace('.js', '');
    // messages[localeKey] = await new Promise((resolve) => {
    //   resolve(locales[filePath]().then((mod) => mod.default));
    // });
    console.log(1);
    messages[localeKey] = new Promise((resolve) => {
      locales[filePath]().then((mod) => {
        console.log(2);
        // console.log(44, Object.keys(locales), filePath, mod.default);
        // Object.assign(messages, { [localeKey]: mod.default });
        return resolve(mod);
      });
    });
    // locales[filePath]().then((mod) => {
    //   console.log(2);
    //   // console.log(44, Object.keys(locales), filePath, mod.default);
    //   // Object.assign(messages, { [localeKey]: mod.default });
    //   messages[localeKey] = mod;
    // });
    console.log(3);
  }
  return messages;
};
// let aa = {};
// LoadLocaleMessages().then((res) => {
//   aa = res;
// });
// console.log(3333, aa);
console.log(888, messages1);
console.log(980, LoadLocaleMessages());
const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: {}
});

export default i18n;
