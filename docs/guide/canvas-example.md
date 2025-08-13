# Canvas 예제

이 페이지는 VitePress에서 HTML Canvas를 사용하는 예제입니다.

## 그리기 도구

마우스로 그림을 그려보세요! 버튼을 클릭하여 도형을 추가할 수도 있습니다.

<CanvasDemo />

## 실시간 차트

실시간으로 업데이트되는 차트를 확인해보세요.

<ChartCanvas />

## 코드에서 직접 Canvas 사용하기

Markdown 파일에서 직접 Canvas를 사용하려면 `<script setup>` 블록을 추가할 수 있습니다:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  
  // 그라데이션 만들기
  const gradient = ctx.createLinearGradient(0, 0, 200, 0)
  gradient.addColorStop(0, 'red')
  gradient.addColorStop(1, 'blue')
  
  // 그라데이션으로 사각형 그리기
  ctx.fillStyle = gradient
  ctx.fillRect(10, 10, 180, 80)
})
</script>

<canvas ref="canvasRef" width="200" height="100" style="border: 1px solid #ddd;"></canvas>
```

실제 예제:

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)

onMounted(() => {
  const ctx = canvasRef.value.getContext('2d')
  
  // 그라데이션 만들기
  const gradient = ctx.createLinearGradient(0, 0, 200, 0)
  gradient.addColorStop(0, '#3eaf7c')
  gradient.addColorStop(1, '#2c8a5c')
  
  // 그라데이션으로 사각형 그리기
  ctx.fillStyle = gradient
  ctx.fillRect(10, 10, 180, 80)
  
  // 텍스트 추가
  ctx.fillStyle = 'white'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Canvas in VitePress!', 100, 55)
})
</script>

<canvas ref="canvasRef" width="200" height="100" style="border: 1px solid #ddd; border-radius: 4px;"></canvas>

## Canvas API 활용 팁

1. **애니메이션**: `requestAnimationFrame`을 사용하여 부드러운 애니메이션 구현
2. **이벤트 처리**: 마우스/터치 이벤트를 통한 인터랙티브 기능
3. **이미지 처리**: `drawImage`를 사용한 이미지 조작
4. **패턴과 그라데이션**: 복잡한 시각 효과 생성
5. **변환**: `rotate`, `scale`, `translate`를 통한 도형 변환