<template>
  <div class="home">
    <h1 class="home__header">
      Список контактов
    </h1>
    <ContactList/>
  </div>
</template>

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
