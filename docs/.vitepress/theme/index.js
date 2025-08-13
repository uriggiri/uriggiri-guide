import DefaultTheme from 'vitepress/theme'
import CanvasDemo from '../components/CanvasDemo.vue'
import ChartCanvas from '../components/ChartCanvas.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 전역 컴포넌트로 등록
    app.component('CanvasDemo', CanvasDemo)
    app.component('ChartCanvas', ChartCanvas)
  }
}