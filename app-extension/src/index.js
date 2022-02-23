/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf) {
  // register our boot file
  conf.boot.push('~@dustlight/quasar-app-extension-json-form/src/boot/register.js')

  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-json-form[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@dustlight/quasar-ui-json-form/src/index.sass')

  // 注入动画
  conf.animations.push(...['fadeInUp'])

  // 注入依赖插件
  conf.framework.plugins.push(...[
    "Dialog"
  ])
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('MyComponent', '~@dustlight/quasar-ui-json-form/src/components/MyComponent.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
