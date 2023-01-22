<template>
  <div id="app">
    <header-item />
    <Nuxt />
    <footer-item />
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import HeaderItem from '~/components/HeaderItem'
import FooterItem from '~/components/FooterItem'

export default {
  name: 'Default',
  components: {
    HeaderItem,
    FooterItem
  },
  mounted () {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }
    this.loadCart()
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  }
}
</script>

<style scoped>

</style>
