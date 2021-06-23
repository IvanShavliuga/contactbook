<template>
  <div class="view">
    <h1 class="view__header">Редактирование контакта</h1>
    <p>{{ select }}</p>
  </div>
</template>
<style lang="less">
@import './../assets/vars.less';
.view {
  width: 90%;
  margin: 0 auto;
  &__header {
    font-family: @fonttitle;
    font-size: 25px;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['select'])
  }
}
</script>
