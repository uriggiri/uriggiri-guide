<template>
  <div class="canvas-container">
    <h3>Canvas 그리기 데모</h3>
    <div class="controls">
      <button @click="drawRect">사각형 그리기</button>
      <button @click="drawCircle">원 그리기</button>
      <button @click="drawLine">선 그리기</button>
      <button @click="clearCanvas">지우기</button>
      <input type="color" v-model="color" @change="changeColor">
    </div>
    <canvas 
      ref="canvas" 
      :width="canvasWidth" 
      :height="canvasHeight"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
const ctx = ref(null)
const isDrawing = ref(false)
const color = ref('#000000')
const canvasWidth = 600
const canvasHeight = 400

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    ctx.value.strokeStyle = color.value
    ctx.value.lineWidth = 2
    ctx.value.lineCap = 'round'
    
    // 초기 배경 설정
    ctx.value.fillStyle = '#f0f0f0'
    ctx.value.fillRect(0, 0, canvasWidth, canvasHeight)
  }
})

const startDrawing = (e) => {
  isDrawing.value = true
  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  ctx.value.beginPath()
  ctx.value.moveTo(x, y)
}

const draw = (e) => {
  if (!isDrawing.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  ctx.value.lineTo(x, y)
  ctx.value.stroke()
}

const stopDrawing = () => {
  isDrawing.value = false
}

const drawRect = () => {
  ctx.value.fillStyle = color.value
  ctx.value.fillRect(50, 50, 100, 100)
}

const drawCircle = () => {
  ctx.value.fillStyle = color.value
  ctx.value.beginPath()
  ctx.value.arc(300, 100, 50, 0, 2 * Math.PI)
  ctx.value.fill()
}

const drawLine = () => {
  ctx.value.strokeStyle = color.value
  ctx.value.beginPath()
  ctx.value.moveTo(400, 50)
  ctx.value.lineTo(500, 150)
  ctx.value.stroke()
}

const clearCanvas = () => {
  ctx.value.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.value.fillStyle = '#f0f0f0'
  ctx.value.fillRect(0, 0, canvasWidth, canvasHeight)
}

const changeColor = () => {
  ctx.value.strokeStyle = color.value
}
</script>

<style scoped>
.canvas-container {
  margin: 20px 0;
}

.controls {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
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

.controls input[type="color"] {
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

canvas {
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: crosshair;
  display: block;
  background: white;
}
</style>