<template>
  <v-card>
    <v-img
      src="https://placeimg.com/640/480/any"
      height="160px"
      @click="goGroup(group.id)"></v-img>
    <v-card-title>
      <v-flex>
        <span><strong>{{ group.name }}</strong></span><br>
      </v-flex>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['group'],
  methods: {
    goGroup (groupId) {
      this.$store.dispatch('setSelectedGroup', this.group)
      this.$router.push(`group/${groupId}`)
    }
  }
}
</script>
