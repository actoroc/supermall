import {request} from './request';
//首页网络请求接口
export function getHomeMultiData() {
    return request({
        url: '/home/multidata'
    })
}
export function getHomeGoods(type,page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}