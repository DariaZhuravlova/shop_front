<template>
  <div
    class="loader-mask"
    :class="{
      'loader-mask-fixed': isFixed,
      'loader-mask-block': isBlock,
    }"
  >
    <div class="loader">
      <div class="circle box-1">S</div>
      <div class="circle box-2">H</div>
      <div class="circle box-3">O</div>
      <div class="circle box-4">P</div>
    </div>
  </div>
</template>
      
    
    
    <script setup>
import { defineProps } from 'vue';

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: false,
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
});
</script>
      <style  scoped>
.loader-mask {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-mask-fixed {
  position: fixed;
  background: black;
  top: 0;
  left: 0;
}

.loader-mask-block {
  position: block;
}

.loader {
  width: 150px;
  height: 50px;
  position: absolute;
  top: calc(50%);
  left: calc(50% - 75px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(5, 188, 82);
  box-shadow: 0 0 10px 3px rgb(5, 188, 82);
}

.box-4 {
  animation: box-4 1.5s infinite;
  scale: 0;
}

@keyframes box-4 {
  60% {
    scale: 0;
  }
  80% {
    scale: 1;
  }
  100% {
    scale: 0;
  }
}

.box-1 {
  animation: box-1 1.5s infinite;
  scale: 0;
}

@keyframes box-1 {
  20%,
  80% {
    scale: 1;
  }
  100% {
    scale: 0;
  }
}

.box-3 {
  animation: box-3 1.5s infinite;
  scale: 0;
}

@keyframes box-3 {
  40% {
    scale: 0;
  }
  60%,
  80% {
    scale: 1;
  }
  100% {
    scale: 0;
  }
}

.box-2 {
  animation: box-2 1.5s infinite;
  scale: 0;
}

@keyframes box-2 {
  20% {
    scale: 0;
  }
  40%,
  80% {
    scale: 1;
  }

  100% {
    scale: 0;
  }
}
</style>