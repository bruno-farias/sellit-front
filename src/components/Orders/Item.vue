<template>
  <div>
    <v-layout row wrap v-for="(product, index) in orderProducts" v-bind:key="index" xs12>
        <v-flex sm12 md5>
          <v-autocomplete
            v-model="product.product_id"
            :items="products"
            :search-input.sync="search"
            cache-items
            class="mx-3"
            flat
            required
            label="Product"
            item-text="name"
            item-value="id"
          ></v-autocomplete>
        </v-flex>

        <v-flex sm12 md3>
          <v-text-field
            label="Price"
            v-model="product.price"
            prefix="$"
            required
          ></v-text-field>
        </v-flex>

        <v-flex sm12 md3>
          <v-text-field
            label="Quantity"
            v-model="product.quantity"
            requried
          ></v-text-field>
        </v-flex>
        <v-flex sm12 md1>
          <v-btn fab dark small color="primary" @click="addOrderProduct">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.getters.products
    }
  },
  data () {
    return {
      search: '',
      blockRemoval: true
    }
  },
  watch: {
    orderProducts () {
      this.blockRemoval = this.orderProducts.length <= 1
    }
  },
  methods: {
    addOrderProduct () {
      let checkEmptyOrderProducts = this.orderProducts.filter(orderProduct => orderProduct.product_id === null)

      if (checkEmptyOrderProducts.length >= 1 && this.orderProducts.length > 0) return

      this.orderProducts.push({
        product_id: null,
        price: null,
        quantity: null
      })
    },
    removeOrderProduct (product_id) {
      if (!this.blockRemoval) this.products.splice(product_id, 1)
    }
  },
  mounted () {
    this.addOrderProduct()
  },
  props: ['orderProducts']
}
</script>
