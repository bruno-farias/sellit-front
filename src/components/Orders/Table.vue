<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Orders</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-layout row justify-end>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-layout>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <CreateEditOrderDialog
          :formTitle="formTitle"
          :dialog="dialog"
          :editedItem="editedItem"
          :close="close"
          :save="save"
        />
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="orders"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.customer }}</td>
        <td class="text-xs-right">{{ props.item.customer_email }}</td>
        <td class="text-xs-right">{{ props.item.items }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-right">{{ props.item.sales_person }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">Reset</v-btn>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import CreateEditOrderDialog from './Create'
  export default {
    components: { CreateEditOrderDialog },
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: '#',
          align: 'left',
          value: 'id'
        },
        { text: 'Customer', value: 'customer', align: 'right', },
        { text: 'Customer Email', value: 'customer_email', align: 'right', },
        { text: 'Total Items', value: 'items', align: 'right', },
        { text: 'Amount', value: 'amount', align: 'right', },
        { text: 'Sales Person', value: 'sales_person', align: 'right', },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    props: ['orders'],

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.orders.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.orders.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.orders[this.editedIndex], this.editedItem)
        } else {
          this.orders.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
