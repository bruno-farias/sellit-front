<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      v-if="isAuth && user !== null"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          v-on="on"
        >
        <v-icon dark>person</v-icon>
          {{user.name}}
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{user.name}}</v-list-tile-title>
              <v-list-tile-sub-title>Username: {{user.username}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="dark" @click.stop="toggleDarkMode" color="purple"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Enable Dark Mode</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat @click="menu = false">Close</v-btn>
          <v-btn color="primary" flat @click.stop="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
</template>

<script>
  export default {
    computed: {
      dark () {
        return this.$store.getters.dark
      },
      isAuth () {
        return this.$store.getters.isAuth
      },
      user () {
        return this.$store.getters.userData
      }
    },
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),
    methods: {
      toggleDarkMode () {
        this.$store.dispatch('toggleDarkMode')
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.replace('/login')
        this.drawer = false
        this.menu = false
      }
    }
  }
</script>