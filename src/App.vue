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
  mounted() {
    window._mfq = window._mfq || [];
    (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.async = true;
        mf.src = "//cdn.mouseflow.com/projects/c393e2cf-393b-48da-ad4e-0ef91f048805.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
    })();
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
