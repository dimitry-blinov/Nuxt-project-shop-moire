export const state = () => ({
  products: [],
  page: 1,
  cartProducts: [],
  userAccessKey: null
})

export const getters = {
  products (state) {
    return state.products
  },
  page (state) {
    return state.page
  },
  cartDetailProducts (state) {
    return state.cartProducts.map((item) => {
      return {
        ...item,
        ...item.product

      }
    })
    // TODO: поправить потом, разобраться что выводить
    // return state.cartProducts.map((item) => {
    //   const { product } = state.cartProducts.find(p => p.product.id === item.productId)
    //   return {
    //     ...item,
    //     product: {
    //       ...product,
    //       image: product.colors[0] ? product.colors[0].gallery[0].file.url : 0,
    //       color: product.colors[0].color.code,
    //       colorTitle: product.colors[0].color.title
    //     }
    //   }
    // })
  }
}

export const mutations = {
  updateProducts (state, items) {
    state.products = items
  },
  updateCartProducts (state, items) {
    state.cartProducts = items
  },
  updateUserAccessKey (state, accessKey) {
    state.userAccessKey = accessKey
  }
}

export const actions = {
  async loadProducts ({ commit }) {
    const response = await this.$axios.$get('/api/products')
    commit('updateProducts', response.items.map(product => ({
      ...product,
      image: product.colors[0].gallery ? product.colors[0].gallery[0].file.url : product.colors[1].gallery[0].file.url
    })))
  },
  async createUserKey ({ commit }) {
    const response = await this.$axios.get('/api/users/accessKey')
    commit('updateUserAccessKey', response.data.accessKey)
  },
  async loadCart ({
    commit,
    state
  }) {
    const response = await this.$axios.get('/api/baskets', {
      params: {
        userAccessKey: state.userAccessKey
      }
    })
    if (!state.userAccessKey) {
      localStorage.setItem('userAccessKey', response.data.user.accessKey)
    }
    commit('updateCartProducts', response.data.items)
  },
  async addProductCart ({
    commit,
    state
  }, {
    productId,
    colorId,
    sizeId,
    quantity
  }) {
    const response = await this.$axios.post('/api/baskets/products', {
      productId,
      colorId,
      sizeId,
      quantity
    }, {
      params: {
        userAccessKey: state.userAccessKey
      }
    })
    commit('updateCartProducts', response.data.items)
  }
}
