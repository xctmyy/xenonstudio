<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <h1 class="logo-text">Xenon Studio</h1>
      </div>

      <!-- Desktop Navigation -->
      <nav class="navbar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="/" class="nav-link active">首页</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">介绍</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">荣誉</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">作品</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">加入</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">友链</a>
          </li>
        </ul>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn" 
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span class="menu-icon" :class="{ 'open': isMobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <ul class="mobile-nav-list">
        <li class="mobile-nav-item">
          <a href="/" class="mobile-nav-link active" @click="toggleMobileMenu">首页</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-link" @click="toggleMobileMenu">介绍</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-link" @click="toggleMobileMenu">荣誉</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-link" @click="toggleMobileMenu">作品</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-link" @click="toggleMobileMenu">加入</a>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-link" @click="toggleMobileMenu">友链</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 处理窗口大小变化，在PC端关闭移动端菜单
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMobileMenuOpen.value = false
  }
}

// 组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 16, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo样式 */
.navbar-logo {
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  background: linear-gradient(45deg, #8a2be2, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05);
}

/* Desktop Navigation */
.navbar-nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #8a2be2, #00bfff);
  transition: width 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
  transform: translateY(-2px);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1100;
}

.menu-icon {
  position: relative;
  width: 24px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.menu-icon span {
  width: 100%;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
  border-radius: 1px;
}

.menu-icon.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 70px;
  left: -100%;
  width: 100%;
  background: rgba(0, 0, 16, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  z-index: 999;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.mobile-nav.open {
  left: 0;
}

.mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.mobile-nav-item {
  width: 100%;
  text-align: center;
}

.mobile-nav-link {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.75rem 0;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  /* 移动端隐藏桌面导航 */
  .navbar-nav {
    display: none;
  }

  /* 移动端显示菜单按钮 */
  .mobile-menu-btn {
    display: flex;
  }

  .navbar-container {
    padding: 1rem;
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .mobile-nav {
    top: 60px;
  }
}

/* 平板设备优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }

  .nav-list {
    gap: 1.5rem;
  }

  .nav-link {
    font-size: 0.95rem;
  }
}

/* 深色主题优化 */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: rgba(0, 0, 16, 0.9);
  }

  .mobile-nav {
    background: rgba(0, 0, 16, 0.98);
  }
}
</style>