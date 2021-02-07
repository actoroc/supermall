import { request } from './request';
//首页网络请求接口
export function getCategory() {
  return request({
    url: '/category',
  });
}
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    },
  });
}
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type,
    },
  });
}
