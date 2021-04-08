<template>
  <div class="tab-control" v-if="titles">
    <div class="content">
      <router-link v-for="(item,index) in titles" :key="item.id" :to="item.link">
        <div
          class="tab-control-item"
          :class="{ active: $store.state.ControlTabCurrentId === item.id }"
          @click="itemClick(index)"
        >
          <span>{{ item.name }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {
    itemClick(index) {
      this.$store.commit('setConrtrolTabCurrentId', this.titles[index].id);
    },
  }
};
</script>

<style scoped>
.tab-control {
  height: 49px;
  width: 100%;
}
.content{
  display: flex;
  width: 50%;
  height: 100%;
  margin: 0px auto;
}
.tab-control a {
  text-align: center;
  flex: 1;
  height: 100%;
  line-height: 49px;
  color: #fff;
  opacity: 0.6;
  text-decoration: none;
}
.active {
  opacity: 1;
  border-bottom: 2px solid #5c5e61;
}
</style>
