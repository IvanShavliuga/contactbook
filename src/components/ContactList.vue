<template>
  <article class="contacts">
    <p class="contacts__nomessage" v-if="!list.length">Пока нет контактов</p>
    <User v-for="(l,k) in list" :user="l" :key="k"/>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import User from './User.vue'
export default {
  name: 'ContactList',
  computed: {
    ...mapGetters(['types', 'list'])
  },
  components: {
    User
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.contacts {
  border: 1px solid #ccc;
  padding: 5px;
  background: white;
  &____nomessage {
    color: red;
  }
}
</style>
