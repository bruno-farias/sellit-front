<template>
  <v-container fluid grid-list-lg>
    <!-- <Header/> -->
    <v-layout row wrap justify-center>
      <v-flex xs12 md10>
        <order-table :orders="orders" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import OrderTable from './Table'

export default {
  components: { OrderTable },
  created () {
    this.$store.dispatch('setCurrentPage', 'groupList')
    this.$store.dispatch('fetchOrderList')
  },
  computed: {
    orders () {
      return this.$store.getters.orders
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
