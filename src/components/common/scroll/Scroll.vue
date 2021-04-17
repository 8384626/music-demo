<template>
  <div class="swiper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    }
    })
  },
  methods: {
    scrollTo(x, y, timer = 500) {
      this.scroll.scrollTo(x, y, timer); //better-scroll内置方法，回到指定位置
    },
  }
};
</script>
<style scoped>
</style>