<template>
  <v-snackbar :color="snackbarColor" v-model="snackbar" vertical class="text-xs-center">
    <span class="text-xs-center" v-html="snackbarMessage"></span>
    <span class="text-xs-left" v-for="error in snackbarErrors">
      <ul v-for="item in error">
        <li>{{item}}</li>
      </ul>
    </span>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar: {
      get () {
        return this.$store.getters.snackbar
      },
      set () {
        this.$store.dispatch('closeSnackbar')
      }
    },
    snackbarMessage () {
      return this.$store.getters.snackbarMessage
    },
    snackbarErrors () {
      return this.$store.getters.snackbarErrors
    },
    snackbarColor () {
      return this.$store.getters.snackbarColor
    }
  }
}
</script>

<style scoped>
  span {
    width: 100%;
  }
</style>