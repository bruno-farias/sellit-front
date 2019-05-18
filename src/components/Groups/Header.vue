<template>
  <v-layout row>
      <v-flex xs10>
        <v-text-field
          label="Search"
          outline
        ></v-text-field>
      </v-flex>

      <v-flex xs2>
        <v-btn color="primary" @click="dialog = !dialog">
          new
        </v-btn>
      </v-flex>
      <Create :dialog="dialog"/>
  </v-layout>
</template>

<script>
import Create from './Create'
export default {
  components: { Create },
  data: () => ({
    dialog: false
  })
}
</script>
