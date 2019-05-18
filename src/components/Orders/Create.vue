<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create new Order</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    name="name"
                    label="Name"
                    required
                    v-model="name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    name="description"
                    label="Description"
                    required
                    v-model="description"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="open = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['dialog'],
    computed: {
      open: {
        get: function () {
          return dialog
        },
        set: function() {
          this.dialog = false
        }
      }
    },
    data: () => ({
      name: null,
      description: null,
      valid: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('createGroup', { name: this.name, description: this.description })
          this.$refs.form.reset()
        }
      }
    }
  }
</script>