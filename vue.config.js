const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app_weight_calculator/'
    : '/'
}

module.exports = {
  pwa: {
    name: 'Tools 2 Sport',
    themeColor: '#4DBA87',
    theme_color: "#4DBA87",
    msTileColor: '#000000',
    background_color: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // }  
  }
}