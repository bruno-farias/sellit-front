<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-btn color="primary" @click="goToLogin">
             Go to login
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      window.location.href = '/register'
    }
  }
}
</script>
