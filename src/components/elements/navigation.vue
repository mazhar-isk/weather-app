<template>
  <v-navigation-drawer
    :value="drawer"
    @input="toggleDrawer"
    app
    dark
    class="bg-linear-blue"
  >
    <v-list nav subheader>
      <v-subheader>Current Location</v-subheader>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>icon-pin</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ cityName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list nav>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Share this app</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Rate this app</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
    cityName: {
      type: String,
      default: ''
    }
  },
  methods: {
    toggleDrawer(val) {
      if (!val && window.outerWidth <= 960) return this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-linear-blue {
  background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
}
</style>
