<template>
  <div id="app" class="app">
    <div class="app__wrapper">
      <h1 class="app__logo">
        <span class="app__logo-first">Contact</span>
        <span class="app__logo-last">Book</span>
      </h1>
      <div id="nav" class="app__nav">
        <router-link to="/">Список</router-link>
        <router-link to="/view">Добавить</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style lang="less">
@import './assets/vars.less';
body, html {
  margin: 0;
  padding: 0;
  font-family: @bodyfont;
}
.app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: @appcolor;
  &__wrapper {
    margin: auto;
    width: 80%;
    height: 100vh;
    background-color: @wrappercolor;
    @media (max-width: 900px) {
      margin: 0;
      width: 100%;
    }
  }
  &__logo {
    margin: 0 auto;
    text-align: center;
    font-family: @fontlogo;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-style: italic;
    background: #a03060;
    &-first {
      color: #de90c0;
    }
    &-last {
      color: #306ec0;
    }
    @media (max-width: 357px) {
      font-size: 15px;
    }
  }
  &__nav {
    padding: 5px 30px;
    text-align: center;
    a {
      font-weight: bold;
      color: #2c3e50;
      font-family: @fonttitle;
      font-size: 25px;
      text-decoration: none;
      padding: 0 10px;
      &.router-link-exact-active {
        color: @menuactive;
      }
      @media (max-width: 481px) {
        font-size: 15px;
      }
    }
  }
}

</style>
<script>
export default {
  watch: {
    $route () {
      if (this.$route.path === '/') {
        this.$store.dispatch('clearSelect')
      }
    }
  }
}
</script>
