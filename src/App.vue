<template>
  <v-app :dark="darkMode">
    <Sidebar :drawer="drawer" />
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
import Sidebar from './components/Sidebar'

export default {
  components: {
    Loader,
    SnackBar,
    UserMenu,
    Sidebar
  },
  computed: {
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
      title: 'Sell It!'
    }
  }
}
</script>
