<template>
<form class="useredit">
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
      >
        Отменить
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
export default {
  data () {
    return {
      user: {
        name: 'test new',
        contacts: []
      },
      mode: 'add'
    }
  },
  computed: {
    ...mapGetters(['select', 'restore', 'types'])
  },
  created () {
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
    }
  },
  methods: {
    addContact () {
      // const fl = this.user.contacts.filter(el => word.length > 6);
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
      this.$router.push('/')
    }
  }
}
</script>
