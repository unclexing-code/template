import request from './index'
//区域概要
export function hhCs({ cityCode }) {
  return request({
    url: '/smartapp/hh/cs/' + cityCode,
    method: 'get'
  })
}
//商圈数量
export function areaCount(data) {
  return request({
    url: '/smartapp/sq/area/count',
    method: 'post',
    data
  })
}
