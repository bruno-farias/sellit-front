<template>
  <v-app :dark="darkMode">
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
    <v-toolbar color="amber" app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <user-menu />
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
    <Loader/>
    <snack-bar/>
  </v-app>
</template>

<script>
import Loader from './components/Loader'
import SnackBar from './components/SnackBar'
import UserMenu from './components/Users/Menu'

export default {
  components: {
    Loader,
    SnackBar,
    UserMenu
  },
  computed: {
    hideDrawer () {
      return this.$route.name === 'login' || this.$route.name === '404'
    },
    isAuth () {
      return this.$store.getters.isAuth
    },
    darkMode () {
      return this.$store.getters.dark
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      right: true,
      title: 'Meeter',
      items: [
        { icon: 'group', text: 'Group', action: this.goGroupList },
        { icon: 'event', text: 'Meeting', action: this.goHome },
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
  }
}
</script>
