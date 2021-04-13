<template>
  <div class="control-tab-bar">
    <div
      v-for="(item, i) in list"
      :key="i"
      class="item"
      @click="currentClick(i)"
      :class="{ action: currentIndex == i }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    currentClick(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$emit("controlBarClick", "music");
          break;
        case 1:
          this.$emit("controlBarClick", "commend");
          break;
        case 2:
          this.$emit("controlBarClick", "collect");
          break;
      }
    },
  },
};
</script>

<style scoped>
.control-tab-bar {
  padding: 10px 0;
  height: 49px;
  display: flex;
  align-items: center;
}
.item {
  padding: 5px 20px;
}
.action {
  border-bottom: 3px solid #b82525;
}
</style>