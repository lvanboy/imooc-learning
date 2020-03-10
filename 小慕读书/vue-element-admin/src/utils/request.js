import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    if (res.code !== 0) {
      Message({
        message: res.msg || '错误',
        type: 'error',
        duration: 5 * 1000
      })
      //token失效
      if (res.code === -2) {
        // to re-login
        MessageBox.confirm('Token 失效，请重新登录', '确认退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || '请求失败'))
    } else {
      return res
    }
  },
  error => {
    let message = error.message || '请求失败';
    if(error.responese&&error.responese.data){
      const {data} = error.responese;
      message = data.msg;
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
