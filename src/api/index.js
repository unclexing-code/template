import axios from 'axios'
import $store from '@/store'
console.log(process.env)
const baseURL = process.env.VUE_APP_BASE_URL
const appId = 'e51be400d3234907bf76a84255c76236'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 60 * 1000,
  withCredentials: false, // 设置为true，http请求会携带本地cookie
  crossDomain: true
})

instance.interceptors.request.use(
  (config) => {
    $store.commit('SET_REQUESTSTATUS_ADD')
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if ($store.getters.token && config.url.indexOf('/wx/user') == -1) {
      config.headers['token'] = $store.getters.token
    }
    console.log(config.url)
    config.url += (config.url.includes('?') ? '&' : '?') + 'app_id=' + appId
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    $store.commit('SET_REQUESTSTATUS_MINUS')
    if (!$store.getters.requestStatus) {
      console.log('接口请求全部完毕')
    }
    if (
      response.data.code != 200 &&
      response.data.code != 10000 &&
      response.data.code != 408
    ) {
      if (
        response.config.url ===
        '/smart/zzlogin?app_id=e51be400d3234907bf76a84255c76236'
      ) {
        response.data.message = '验证码错误'
      }
    }
    return response.data
  },
  (error) => {
    $store.commit('SET_REQUESTSTATUS_MINUS')
    console.log(error, '响应拦截')
  }
)

export default instance
