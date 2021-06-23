<template>
<form class="useredit">
  <fieldset class="useredit__block">
    <legend class="useredit__block-legend">Имя</legend>
    <input class="useredit__block-input" type="text" v-model="user.name"/>
  </fieldset>
  <fieldset class="useredit__block">
    <legend class="useredit__block-legend">Контакты</legend>
    <div class="useredit__block-contact" v-for="(c, k) in user.contacts" :key="k">
      <input class="useredit__block-type" type="text" v-model="c.type"/>
      <input class="useredit__block-link" type="text" v-model="c.link"/>
      <button class="useredit__block-delete">Удалить</button>
    </div>
  </fieldset>
</form>
</template>
<style lang="less">
@import './../assets/mixins.less';
.useredit {
  &__block {
    width: 90%;
    margin: 5px auto;
    &-input {
      display: block;
      width: 95%;
      margin: 0 auto;
      padding: 2px 5px;
    }
    &-type {
      width: 100px;
    }
    &-link {
      width: 60%;
      @media (max-width: 735px) {
        width: 50%;
      }
      @media (max-width: 590px) {
        width: 40%;
      }
    }
    &-delete {
      .button();
    }
    &-contact {
      width: auto;
      margin: 10px auto;
      @media (max-width: 590px) {
        display: block;
        > * {
          display: block;
          margin: 5px;
        }
        > input {
          width: 95%;
        }
      }
    }
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      user: {
        name: 'test new',
        contacts: []
      }
    }
  },
  computed: {
    ...mapGetters(['select', 'restore'])
  },
  created () {
    this.user.name = this.select.name
    this.user.contacts = []
    for (const c of this.select.contacts) {
      this.user.contacts.push({
        type: c.type,
        link: c.link
      })
    }
  }
}
</script>
