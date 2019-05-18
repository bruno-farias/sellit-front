<template>
<v-layout row justify-center>
  <v-dialog v-model="loading" persistent content content-class="centered-dialog">
    <v-container fill-height>
      <v-layout column justify-center align-center>
        <self-building-square-spinner
          :animation-duration="6000"
          :size="40"
          color="#ff1d5e"
        />
        <h1 v-if="message != null">{{message}}</h1>
      </v-layout>
    </v-container>
  </v-dialog>
</v-layout>
</template>

<script>
import { SelfBuildingSquareSpinner  } from 'epic-spinners'
import { mapGetters } from 'vuex'

export default {
  name: "Loading",
  computed: {
    ...mapGetters([
      'loading',
      'message',
      'color'
    ])
  },
  components: {
    SelfBuildingSquareSpinner
  }
}
</script>

<style>
.dialog.centered-dialog,
  .v-dialog.centered-dialog
 {
    background: #282c2dad;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: whitesmoke;
  }
</style>
