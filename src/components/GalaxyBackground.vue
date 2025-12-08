<template>
  <div class="galaxy-background">
    <!-- 基础背景渐变 -->
    <div class="background-gradient"></div>

    <!-- Three.js 3D粒子系统 -->
    <canvas ref="canvas" class="galaxy-canvas"></canvas>

    <!-- CSS 2D星星 -->
    <div class="stars-container">
      <div
        v-for="(star, index) in stars"
        :key="index"
        :class="['star', star.isRound ? 'round-star' : 'square-star']"
        :style="{
          left: star.x + 'px',
          top: star.y + 'px',
          width: star.size + 'px',
          height: star.size + 'px',
          opacity: star.opacity,
          animationDelay: star.delay + 's',
          animationDuration: star.duration + 's',
        }"
      ></div>
    </div>

    <!-- 星云覆盖层 -->
    <div class="nebula-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  duration: number
  isRound: boolean
  speedX: number
  speedY: number
}

// DOM元素引用
const canvas = ref<HTMLCanvasElement | null>(null)

// 2D星星数据
const stars = ref<Star[]>([])

// Three.js相关变量
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationId: number

// 初始化Three.js场景
const initThreeJS = () => {
  if (!canvas.value) {
    console.error('Canvas元素未找到')
    return
  }

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 10

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000010, 0) // 透明背景

  // 创建粒子系统
  createParticles()
}

// 创建粒子系统
const createParticles = () => {
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  // 生成粒子数据
  for (let i = 0; i < particleCount; i++) {
    // 随机位置
    const radius = Math.random() * 15
    const angle = Math.random() * Math.PI * 2
    const height = (Math.random() - 0.5) * 10

    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius

    // 随机颜色
    colors[i * 3] = 0.5 + Math.random() * 0.5 // R
    colors[i * 3 + 1] = 0.3 + Math.random() * 0.7 // G
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2 // B

    // 随机大小
    sizes[i] = Math.random() * 0.1 + 0.05
  }

  // 创建几何体
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // 创建材质
  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  // 创建粒子对象
  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

// 移动2D星星
const moveStars = () => {
  stars.value.forEach((star) => {
    // 更新星星位置
    star.x += star.speedX
    star.y += star.speedY

    // 边界检测，让星星在屏幕内循环移动
    if (star.x < -50) star.x = window.innerWidth + 50
    if (star.x > window.innerWidth + 50) star.x = -50
    if (star.y < -50) star.y = window.innerHeight + 50
    if (star.y > window.innerHeight + 50) star.y = -50
  })
}

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 旋转粒子系统
  if (particles) {
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005
  }

  // 移动2D星星
  moveStars()

  // 渲染场景
  renderer.render(scene, camera)
}

// 处理窗口大小变化
const handleResize = () => {
  if (!canvas.value) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// 生成2D星星
const generateStars = () => {
  const starCount = 200
  const newStars: Star[] = []

  for (let i = 0; i < starCount; i++) {
    const isRound = Math.random() > 0.5 // 50%概率为圆形星星

    newStars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      isRound: isRound,
      speedX: isRound ? (Math.random() - 0.5) * 0.1 : (Math.random() - 0.5) * 0.5, // 圆形星星移动更慢
      speedY: isRound ? (Math.random() - 0.5) * 0.1 : (Math.random() - 0.5) * 0.5, // 圆形星星移动更慢
    })
  }

  stars.value = newStars
}

// 组件挂载时初始化
onMounted(() => {
  // 生成2D星星
  generateStars()

  // 初始化Three.js（延迟执行以确保DOM加载完成）
  setTimeout(() => {
    initThreeJS()
    animate()
    window.addEventListener('resize', handleResize)
  }, 100)
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  window.removeEventListener('resize', handleResize)

  // 清理Three.js资源
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.galaxy-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

/* 基础背景渐变 */
.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #000010 0%, #000030 50%, #001030 100%);
  z-index: 0;
}

/* Three.js画布 */
.galaxy-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 2D星星容器 */
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

/* 2D星星样式 */
.star {
  position: absolute;
  background: white;
  animation: twinkle infinite alternate ease-in-out;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

/* 圆形星星 */
.round-star {
  border-radius: 50%;
}

/* 方形星星 */
.square-star {
  border-radius: 0;
}

/* 星星闪烁动画 */
@keyframes twinkle {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 星云覆盖层 */
.nebula-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(64, 32, 128, 0.15) 0%,
    rgba(16, 8, 32, 0.7) 70%,
    rgba(0, 0, 0, 0.9) 100%
  );
  pointer-events: none;
  z-index: 3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .star {
    width: 2px !important;
    height: 2px !important;
  }
}
</style>
