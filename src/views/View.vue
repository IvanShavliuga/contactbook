<template>
  <div class="view">
    <EditUser/>
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
    @media (max-width: 481px) {
      font-size: 15px;
    }
  }
}
</style>
<script>
import EditUser from '@/components/EditUser.vue'
export default {
  components: {
    EditUser
  },
  watch: {
    $route () {
      console.log('watch route ')
    }
  }
}
</script>
