//! Astro 内置了postcss, 不用安装，只需安装插件即可

// need npm i -D postcss-load-config 
/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    'postcss-preset-env': {
    }
  }
}



