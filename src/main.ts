import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 添加全局CSS重置样式
const globalStyles = document.createElement('style')
globalStyles.textContent = `
  /* 全局重置 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  html {
    font-size: 16px;
    line-height: 1.5;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #000;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 移除默认滚动条 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 确保canvas和视频等媒体元素正确显示 */
  canvas, video, img {
    display: block;
    max-width: 100%;
  }
`
document.head.appendChild(globalStyles)

const app = createApp(App)

app.use(router)

app.mount('#app')
