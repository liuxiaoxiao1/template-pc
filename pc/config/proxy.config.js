const deploy = process.env.NODE_DEPLOY || 'prod'
const envBase = require('./env/env')
const envDeploy = require(`./env/env.${deploy}`)
const env = Object.assign(envBase, envDeploy)

// 通用转发
const proxy = {
  target: env.PWA_TUJIA_HOST,
  changeOrigin: true
}

// 已经在测试环境配置好的转发，直接将path放到这个数组中
let nginxpProxy = {}
const pathList = [
  '/api',
  '/bingo',
  '/H5APICommon',
  '/zmactivitycode_915',
  '/feapi/m',
  '/feapi/cscmerchant',
  '/feapi/providercrm',
  '/feapi/passport',
  '/feapi/bapi',
  '/feapi/tnsbpromotion',
  '/feapi/tradeweb',
  '/feapi/merchantcrm'
]
for (let i = 0; i < pathList.length; i++) {
  const path = pathList[i]
  nginxpProxy[path] = proxy
}

// 未在测试环境配置的转发，可以自己进行自定义，当测试环境配置完成后，移到上面的数组里
let customerProxy = {
  // 示例：
  // '/api': {
  //   target: env.M_TUJIA_HOST,
  //   changeOrigin: true
  // }
}

module.exports = Object.assign(nginxpProxy, customerProxy)
