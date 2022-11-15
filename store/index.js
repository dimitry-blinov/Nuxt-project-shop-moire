export const state = () => ({
  products: [],
  page: 1
})

export const getters = {
  products (state) {
    return state.products
  },
  page (state) {
    return state.page
  }
}

export const mutations = {
  updateProducts (state, items) {
    state.products = items
  }
}

export const actions = {
  /*
    async loadProducts ({ commit }) {
      const response = await this.$axios.$get('https://vue-moire.skillbox.cc/api/products')
      commit('updateProducts', response.items.map(product => ({
        ...product,
        image: product.colors[0].gallery ? product.colors[0].gallery[0].file.url : product.colors[1].gallery[0].file.url
      })))
    }

   */
}
