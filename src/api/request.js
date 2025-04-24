import axios from 'axios'

// const baseURL = '/proxyApi'
const baseURL =
  import.meta.env.VITE_APP_ENV == 'dev' ? '/proxyApi' : import.meta.env.VITE_APP_API_BASE

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const Axios = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

// 存储csrf token
let csrfToken = null

// 获取csrf cookie , 接口未返回内容，只有cookie
const getCrsfToken = async () => {
  try {
    await Axios.get(`/csrf-cookie`)
    console.log(
      document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('XSRF-TOKEN='))
        ?.split('=')[1],
    )
    return document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('XSRF-TOKEN='))
      ?.split('=')[1]
  } catch (error) {
    console.log(error)
  }
}

// 响应拦截器
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response
    switch (status) {
      case 401:
        console.log('未登录')
        break
      case 403:
        console.log('权限不足')
        break
      case 405:
        console.log('请求方法不支持')
        break
      case 500:
        console.log('服务器错误')
        break
    }

    return Promise.reject(error)
  },
)

//请求拦截器
Axios.interceptors.request.use(
  async (config) => {
    // post、put、delete请求时，在请求头中携带token
    if (['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
      if (!csrfToken) csrfToken = await getCrsfToken()
      config.headers['X-XSRF-TOKEN'] = csrfToken.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default Axios
