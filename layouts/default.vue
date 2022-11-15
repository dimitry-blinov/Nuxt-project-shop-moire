<template>
  <div id="app">
    <header-item />
    <Nuxt />
    <footer-item />
  </div>
</template>
<script>
import HeaderItem from '~/components/HeaderItem'
import FooterItem from '~/components/FooterItem'

export default {
  name: 'Default',
  components: {
    HeaderItem,
    FooterItem
  }
}
</script>

<style scoped>

</style>
