import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import encBase64 from 'crypto-js/enc-base64';
import encHex from 'crypto-js/enc-hex';
import padPkcs7 from 'crypto-js/pad-pkcs7';
import CryptoJSCore from 'crypto-js/core';

const key = encUtf8.parse('SecwRd666Secward');
const iv = encUtf8.parse('SecwRD666Secward');

// AES加密
export const encrypt = function (sourceData) {
  if (!sourceData) return '';
  const data = typeof sourceData === 'object' ? JSON.stringify(sourceData) : `${sourceData}`;
  let encrypted = '';
  const srcs = encUtf8.parse(data);
  encrypted = AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJSCore.mode.CBC,
    padding: padPkcs7
  });
  return encrypted.ciphertext.toString();
};

// AES解密
export const decrypt = function (sourceData) {
  if (!sourceData) return '';
  const encryptedHexStr = encHex.parse(sourceData);
  const srcs = encBase64.stringify(encryptedHexStr);
  const decrypt = AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJSCore.mode.CBC,
    padding: padPkcs7
  });
  const decryptedStr = decrypt.toString(encUtf8);
  return decryptedStr.toString();
};
