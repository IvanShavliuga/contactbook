<template>
  <ul class="user">
    <li class="user__name">
      <span>#{{ user.id }} {{ user.name }}</span>
      <span class="user__control">
        <button
          class="user__control-button"
          @click="show"
        >
          {{ user.show?'hide':'show' }}
        </button>
        <button
          class="user__control-button"
          @click="select"
        >
          Edit
        </button>
        <button
          class="user__control-button"
          @click="delitem"
        >
          Delete
        </button>
      </span>
    </li>
    <ol class="user__contacts" v-if="user.show">
      <li class="user__contacts-item" v-for="(c, k) in user.contacts" :key="k">
        <span>{{ c.type }}</span>
        <span>{{ c.link }}</span>
      </li>
    </ol>
  </ul>
</template>
<style scoped lang="less">
@import './../assets/vars.less';
@import './../assets/mixins.less';
.user {
  list-style: none;
  margin: 0;
  padding: 0;
  &__name {
    span {
      display: inline-block;
      &:first-child {
        font-weight: bold;
        width: 65%;
        padding: 5px 0;
      }
    }
  }
  &__control {
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    &-button {
      .button();
    }
  }
  &__contacts {
    margin: 0;
    padding: 0;
    list-style: none;
    &-item {
      padding: 0 15px;
      span {
        display: inline-block;
        &:first-child {
          width: 100px;
        }
        &:last-child {
          font-style: italic;
        }
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    show () {
      console.log('show')
      this.$store.dispatch('showItem', { id: this.user.id })
    },
    delitem () {
      console.log('delitem')
      this.$emit('deleteItem', { id: this.user.id })
    },
    select () {
      console.log('select')
      this.$store.dispatch('selectItem', { id: this.user.id })
      this.$router.push('/view')
    }
  }
}
</script>
