<template>
  <article class="contacts">
    <p
      class="contacts__nomessage"
      v-if="!list.length"
    >
      Пока нет контактов
    </p>
    <Modal
      v-if="modalShow"
      @yes="yesclick"
      @no="noclick"
    />
    <User
      v-for="(l,k) in list"
      :user="l"
      :key="k"
      @deleteItem="del"
    />
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import User from './User.vue'
import Modal from './Modal.vue'

export default {
  name: 'ContactList',
  computed: {
    ...mapGetters(['types', 'list'])
  },
  components: {
    User,
    Modal
  },
  data () {
    return {
      modalShow: false,
      selid: -1
    }
  },
  methods: {
    yesclick () {
      console.log('yes')
      this.modalShow = false
      this.$store.dispatch('deleteItem', { id: this.selid })
      this.selid = -1
    },
    noclick () {
      console.log('no')
      this.modalShow = false
      this.selid = -1
    },
    del (obj) {
      console.log('del')
      this.selid = obj.id
      this.modalShow = true
    }
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
