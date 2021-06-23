<template>
<form class="useredit" @input="resetflag">
  <Modal
    v-if="msgid+1"
    @yes="yesclick"
    @no="noclick"
    msg="Действительно откатить измения?"
  />
  <p v-if="saveflag" class="useredit__message">Текущие изменения сохранены</p>
  <p v-if="restoreflag" class="useredit__message">Предыдущие изменения восстановлены</p>
  <fieldset class="useredit__block">
    <legend class="useredit__block-legend">
      Имя
    </legend>
    <input
      class="useredit__block-input"
      type="text"
      v-model="user.name"
    />
  </fieldset>
  <fieldset class="useredit__block">
    <legend class="useredit__block-legend">
      Контакты
    </legend>
    <div class="user.contacts-control">
      <button
        class="useredit__block-button"
        @click.prevent="addContact"
      >
        Добавить
      </button>
      <button
        class="useredit__block-button"
        @click.prevent="saveContact"
      >
        Сохранить
      </button>
      <button
        class="useredit__block-button"
        @click.prevent="undoitem"
        :disabled="!undo"
      >
        Отменить
      </button>
      <button
        class="useredit__block-button"
        @click.prevent="restoreclick"
        :disabled="!restore"
      >
        Шаг назад
      </button>
    </div>
    <p v-if="!user.contacts.length">
      Контактов не обнаружено
    </p>
    <div
      class="useredit__block-contact"
      v-for="(c, k) in user.contacts"
      :key="k"
    >
      <select
        class="useredit__block-type"
        type="text"
        v-model="c.type"
      >
        <option
          v-for="(t, k) in types"
          :key="k"
        >
          {{ t }}
        </option>
      </select>
      <input
        class="useredit__block-link"
        type="text"
        v-model="c.link"
      />
      <button
        class="useredit__block-button"
        @click.prevent="delitem(k)"
      >
        Удалить
      </button>
    </div>
  </fieldset>
</form>
</template>
<style lang="less">
@import './../assets/mixins.less';
.useredit {
  &__message {
    background: tomato;
    color: yellow;
    padding: 5px 15px;
  }
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
      background-color: white;
      option {
        color: black;
        background-color: white;
      }
      &:hover {
        color: black;
        background-color: #de32de;
      }
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
    &-button {
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
import Modal from './Modal.vue'
export default {
  data () {
    return {
      user: {
        name: 'test new',
        contacts: []
      },
      mode: 'add',
      saveflag: false,
      restoreflag: false,
      msgid: -1,
      iddel: -1,
      messages: ['Действительно удалить контакт?', 'Действительно откатить измения?']
    }
  },
  components: {
    Modal
  },
  computed: {
    ...mapGetters(['select', 'undo', 'restore', 'types'])
  },
  created () {
    localStorage.setItem('contactbookedit', true)
    if (this.select) {
      this.user.name = this.select.name
      this.user.contacts = []
      for (const c of this.select.contacts) {
        this.user.contacts.push({
          type: c.type,
          link: c.link
        })
      }
      this.mode = 'edit'
    } else {
      this.user.name = 'Anonimus'
      this.user.contacts = []
      this.mode = 'add'
      this.$store.dispatch('clearHistory')
    }
    this.saveflag = false
  },
  methods: {
    modflag () {
      this.modifed = true
      console.log(this.restore)
    },
    delitem (id) {
      this.msgid = 0
      this.iddel = id
    },
    addContact () {
      // const fl = this.user.contacts.filter(el => word.length > 6);
      this.modflag()
      this.user.contacts.push({
        type: 'email',
        link: 'annonimus@test.tst'
      })
    },
    saveContact () {
      /* удаление повтрояющихся элементов */
      let arr = this.user.contacts
      arr = arr.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.link === thing.link && t.type === thing.type
        ))
      )
      this.user.contacts = arr
      if (this.mode === 'edit') {
        const sdta = { ...this.user, show: true, id: this.select.id }
        this.$store.dispatch('saveContact', sdta)
      } else if (this.mode === 'add') {
        const sdta = { ...this.user, show: true, id: null }
        console.log(sdta)
        this.$store.dispatch('addContact', sdta)
      }
      this.saveflag = true
      this.restoreflag = false
      // this.$router.push('/')
    },
    yesclick () {
      console.log('yes')
      if (this.msgid === 0) {
        this.modifed = true
        this.user.contacts.splice(this.iddel, 1)
      }
      if (this.msgid === 1) {
        if (this.undo) {
          this.$store.dispatch('undoContact')
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
      this.msgid = -1
    },
    noclick () {
      console.log('no')
      this.msgid = -1
    },
    undoitem () {
      this.msgid = 1
    },
    restoreclick () {
      console.log('start restore')
      this.saveflag = false
      this.restoreflag = true
      this.$store.dispatch('restoreContact')
      this.user = { ...this.select }
    },
    resetflag () {
      this.saveflag = false
      this.restoreflag = false
    }
  }
}
</script>
