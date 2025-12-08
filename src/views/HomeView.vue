<script setup lang="ts">
import GalaxyBackground from '../components/GalaxyBackground.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <GalaxyBackground />
    <main class="content">
      <h1 class="title">Xenon Studio</h1>
    </main>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px); /* 减去顶栏高度 */
  color: white;
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  background: linear-gradient(45deg, #8a2be2, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
