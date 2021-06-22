<template>
  <div class="home">
    <h2 class="home__header">
      Список контактов
    </h2>
    <ContactList/>
  </div>
</template>
<style lang="less">
@import './../assets/vars.less';
.home {
  width: 90%;
  margin: 0 auto;
  &__header {
    font-family: @fonttitle;
    font-size: 25px;
  }
}
</style>
<script>
// @ is an alias to /src
import ContactList from '@/components/ContactList.vue'

export default {
  name: 'Home',
  components: {
    ContactList
  }
}
</script>
