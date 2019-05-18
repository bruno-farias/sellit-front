<template>
  <v-container fluid grid-list-lg>
    <Header/>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 lg2
        v-for="group in groups" :key="group.id">
        <group-item :group="group" />
      </v-flex>
      <h2 v-if="groups.length === 0 && !loading" class="text-xs-center no-events-warning">
        No groups found
      </h2>
    </v-layout>
  </v-container>
</template>

<script>
import Header from './Header'
import GroupItem from './Item'

export default {
  components: { Header, GroupItem },
  created () {
    this.$store.dispatch('setCurrentPage', 'groupList')
    this.$store.dispatch('fetchGroupList')
  },
  computed: {
    groups () {
      return this.$store.getters.groups
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
