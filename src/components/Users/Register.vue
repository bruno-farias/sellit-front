<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="amber">
              <v-toolbar-title>Register</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-icon="person_outline"
                  v-model="name"
                  :rules="nameRules"
                  label="Full name"
                  required
                ></v-text-field>

                <v-text-field
                  prepend-icon="email"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  :rules="passwordRules"
                  v-model="password"
                  required
                ></v-text-field>

                <v-text-field
                  id="retyped_password"
                  prepend-icon="lock"
                  name="retyped_password"
                  label="Confirm Password"
                  placeholder="Enter same Password"
                  type="password"
                  :rules="passwordMatchRule"
                  v-model="retyped_password"
                  required
                ></v-text-field>

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :disabled="!valid" @click="submit">submit</v-btn>
              <v-btn color="primary" @click="reset">reset</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  computed: {
    passwordMatchRule() {
      return [
        v => !!v || 'Password confirmation is required',
        () => (this.password === this.retyped_password) || 'Passwords should match'
      ]
    }
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    retyped_password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length > 3 || 'Name must be bigger than 3 characters'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/.test(v) || 'Password should be seven characters long and contain at least one digit, one upper case letter and one lower'
    ],
    valid: false
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('register', { userData: userData })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
  },
}
</script>