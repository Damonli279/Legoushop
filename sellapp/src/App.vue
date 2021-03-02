<template>
  <div id="app">
    <index></index>
    <!-- <div>1</div> -->
  </div>
</template>

<script>
import index from './views/Index'
export default {
  components: {
    index
  }
};
</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
