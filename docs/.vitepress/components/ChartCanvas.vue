<template>
  <div class="chart-container">
    <h3>실시간 차트 데모</h3>
    <div class="controls">
      <button @click="startAnimation">애니메이션 시작</button>
      <button @click="stopAnimation">정지</button>
      <button @click="resetChart">리셋</button>
    </div>
    <canvas ref="chartCanvas" :width="600" :height="300"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const chartCanvas = ref(null)
const ctx = ref(null)
const data = ref([])
const animationId = ref(null)
const maxDataPoints = 50

onMounted(() => {
  if (chartCanvas.value) {
    ctx.value = chartCanvas.value.getContext('2d')
    initializeData()
    drawChart()
  }
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})

const initializeData = () => {
  data.value = []
  for (let i = 0; i < 20; i++) {
    data.value.push(Math.random() * 100)
  }
}

const drawChart = () => {
  const canvas = chartCanvas.value
  const context = ctx.value
  const width = canvas.width
  const height = canvas.height
  
  // Clear canvas
  context.clearRect(0, 0, width, height)
  
  // Draw background
  context.fillStyle = '#f8f9fa'
  context.fillRect(0, 0, width, height)
  
  // Draw grid
  context.strokeStyle = '#e0e0e0'
  context.lineWidth = 1
  
  for (let i = 0; i <= 10; i++) {
    const y = (height / 10) * i
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()
  }
  
  // Draw data
  if (data.value.length > 0) {
    const barWidth = width / data.value.length
    
    data.value.forEach((value, index) => {
      const barHeight = (value / 100) * height * 0.8
      const x = index * barWidth
      const y = height - barHeight - 20
      
      // Draw bar
      const gradient = context.createLinearGradient(0, y, 0, height - 20)
      gradient.addColorStop(0, '#3eaf7c')
      gradient.addColorStop(1, '#2c8a5c')
      
      context.fillStyle = gradient
      context.fillRect(x + barWidth * 0.1, y, barWidth * 0.8, barHeight)
      
      // Draw value text
      context.fillStyle = '#333'
      context.font = '12px Arial'
      context.textAlign = 'center'
      context.fillText(Math.round(value), x + barWidth / 2, y - 5)
    })
  }
}

const animate = () => {
  // Add new data point
  data.value.push(Math.random() * 100)
  
  // Remove old data point if exceeds max
  if (data.value.length > maxDataPoints) {
    data.value.shift()
  }
  
  drawChart()
  animationId.value = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (!animationId.value) {
    animate()
  }
}

const stopAnimation = () => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
}

const resetChart = () => {
  stopAnimation()
  initializeData()
  drawChart()
}
</script>

<style scoped>
.chart-container {
  margin: 20px 0;
}

.controls {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.controls button {
  padding: 8px 16px;
  background-color: #3eaf7c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls button:hover {
  background-color: #2c8a5c;
}

canvas {
  border: 2px solid #ddd;
  border-radius: 4px;
  display: block;
}
</style>