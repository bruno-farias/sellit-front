<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="amber">
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  v-model="email"
                  type="email"
                ></v-text-field>

                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="amber" @click="goRegister">Create Account</v-btn>
              <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('setCurrentPage', 'login')
  },
  data: () => ({
    valid: false,
    email: null,
    password: null
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('login', { email: this.email, password: this.password })
      }
    },
    goRegister () {
      window.location.href = '/register'
    }
  },
  props: {
    source: String
  }
}
</script>
