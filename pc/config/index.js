const deploy = process.env.NODE_DEPLOY || 'prod'
const envBase = require('./env/env')
const envDeploy = require(`./env/env.${deploy}`)
const env = Object.assign(envBase, envDeploy)
const proxyMap = require('./proxy.config')

module.exports = {
  env, // 环境变量
  build: {
    assetsPublicPath: env.NO_VERSION_STATIC_CDN_PREFIX
  },
  dev: {
    assetsPublicPath: '/',
    proxyTable: proxyMap
  }
}
