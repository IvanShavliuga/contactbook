<template>
<div class="modal">
  <div class="modal__box">
    <h2 class="modal__header">Вы подтверждаете</h2>
    <p class="modal__text">Действительно удалить контакт?</p>
    <span class="modal__control">
      <button
        class="modal__control-button"
        @click="yesclick"
      >
        Да
      </button>
      <button
        class="modal__control-button"
        @click="noclick"
      >
        Нет
      </button>
    </span>
  </div>
</div>
</template>
<style lang="less">
@import './../assets/vars.less';
.modal {
  position: relative;
  &__box {
    position: absolute;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid #777;
    box-shadow: 0 0 7px 5px #999;
  }
  &__header {
    font-family: @fonttitle;
    font-size: 20px;
  }
  &__control {
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    &-button {
      display: inline-block;
      background-color: transparent;
      color: purple;
      border: 1px solid purple;
      margin: 0 5px;
      padding: 0 5px;
      outline: none;
    }
  }
}
</style>
<script>
export default {
  methods: {
    yesclick () {
      this.$emit('yes')
    },
    noclick () {
      this.$emit('no')
    }
  }
}
</script>
