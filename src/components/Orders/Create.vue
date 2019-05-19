<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-select
                    :items="salesPersons"
                    label="Sales Person"
                    v-model="editedItem.user_id"
                    item-text="name"
                    item-value="id"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-autocomplete
                    v-model="editedItem.customer_id"
                    :items="customers"
                    :search-input.sync="search"
                    cache-items
                    class="mx-3"
                    flat
                    required
                    hide-no-data
                    hide-details
                    label="Customer"
                    item-text="name"
                    item-value="id"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    name="notes"
                    v-model="editedItem.notes"
                    label="Notes"
                    hint="Say something nice ;)"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <!-- Individual items -->
                  <Item :orderProducts="orderProducts" />
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>

        </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import Item from './Item'

  export default {
    beforeMount () {
      this.$store.dispatch('fetchSalesUsers')
      this.$store.dispatch('fetchAllUsers')
    },
    components: { Item },
    computed: {
      salesPersons () {
        return this.$store.getters.salesPersons
      },
      customers () {
        return this.$store.getters.users
      }
    },
    props: ['dialog'],
    data: () => ({
      name: null,
      description: null,
      valid: false,
      search: null,
      select: null,
      orderProducts: [],
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          const orderData = {
            user_id: this.editedItem.user_id,
            customer_id: this.editedItem.customer_id,
            notes: this.editedItem.notes
          }
          const orderProductsData = this.orderProducts
          console.log({ orderProductsData })

          this.$store.dispatch('createOrder', { orderData, orderProductsData })
          this.$refs.form.reset()
        }
      }
    },
    props: ['formTitle', 'dialog', 'editedItem', 'close', 'save']
  }
</script>