const fs = require('fs');

const hasLocaleKey = (object, key) => {
  return object != null && Object.hasOwnProperty.call(object, key);
};

// createFolder -
const createFolder = (path, dir = 'locales') => {
  if (fs.existsSync(`${path}/${dir}`)) return;
  fs.mkdirSync(`${path}/${dir}`);
};

// Analysis object, Using recursive method
const fn = (target, index, prev = '') => {
  let str = '';
  switch (Array.isArray(target)) {
    case true:
      str += `'${target[index]}',`;
      break;
    case false:
      Object.keys(target).forEach((next) => {
        str += `'${next}':${fn(target[next], index, prev)}`;
      });
      str = `{${str}},`;
  }
  const result = prev += str;
  return result;
};

export const GenLocalesPlugin = ({ path = '', target = '' }) => {
  // check path
  if (!path) {
    throw new Error('locale path is required');
  }
  if (!target) {
    throw new Error('target is required');
  }

  const source = JSON.parse(fs.readFileSync(`${path}/${target}`, 'utf-8'));
  const dir = 'locales';

  // get locale
  const locales = source.locale;

  // check has locale key
  if (!hasLocaleKey(source, 'locale')) throw new Error('locale key is required');

  // createFolder
  createFolder(path, dir);

  locales.forEach((locale, index) => {
    let result = fn(source, index);
    result = (result.substr(0, result.length - 1));

    const file = `${path}/${dir}/${locale}.js`;
    fs.writeFileSync(file, `/* eslint-disable */  export default (${result})`);
  });
};
