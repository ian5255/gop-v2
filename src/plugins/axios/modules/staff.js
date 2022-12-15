import { Get, Put, Post, Delete } from '@/plugins/axios/setting/methods.js';

const router = {
  STAFF_LIST: '/staff/staffs',
  STAFF_CREATE: '/staff',
  STAFF_EDIT: '/staff/{id}',
  STAFF_DELETE: '/staff/{id}'
};

/** 取得人員列表
 * @param { Object } params
 */
export const StaffList = (params) => {
  return Get(router.STAFF_LIST, params);
};

/** 新增人員
 *  @param { Object } params
 */
export const StaffCreate = (params) => {
  return Post(router.STAFF_CREATE, params);
};

/** 編輯人員
 *  @param { String } staffId
 *  @param { Object } params
 */
export const StaffEdit = (staffId, params) => {
  return Put(router.STAFF_EDIT.replace('{id}', staffId), params);
};

/** 刪除人員
 *  @param { String } staffId // staffId
 */
export const StaffDelete = (staffId) => {
  return Delete(router.STAFF_DELETE.replace('{id}', staffId));
};
