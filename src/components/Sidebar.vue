<template>
  <v-navigation-drawer v-if="!hideDrawer" v-model="drawer" fixed clipped app>
      <v-subheader class="mt-3 primary--text text--darken-1">Menu</v-subheader>
      <v-list debse class="pt-0">
        <v-list-tile v-for="item in items" :key="item.text" @click.stop="item.action">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div v-if="isAuth">
        <v-divider dark class="my-3"></v-divider>
        <v-subheader class="mt-3 primary--text text--darken-1">Account</v-subheader>
        <v-list debse class="pt-0">
          <v-list-tile v-for="item in loggedItems" :key="item.text" @click.stop="item.action">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.text}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    hideDrawer () {
      return this.$route.name === 'login' || this.$route.name === '404'
    },
    isAuth () {
      return this.$store.getters.isAuth
    },
  },
  data() {
    return {
      items: [
        { icon: 'assignment', text: 'Orders', action: this.goGroupList },
        { icon: 'shopping_basket', text: 'Products', action: this.goHome },
        { icon: 'loyalty', text: 'Categories', action: this.goHome },
        { icon: 'person', text: 'Users', action: this.goUserList },
      ],
      loggedItems: [
        { icon: 'exit_to_app', text: 'Logout', action: this.logout }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
      this.drawer = false
    },
    goGroupList () {
      this.$router.push('/group/list')
      this.drawer = false
    },
    goUserList () {
      this.$router.push('/user/list')
      this.drawer = false
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
      this.drawer = false
    }
  },
  props: ['drawer']
}
</script>
