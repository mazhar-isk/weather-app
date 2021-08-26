<template>
  <v-app id="inspire">
    <navigation
      :drawer="drawer"
      :items="items"
      :cityName="currentLocation.name"
      @toggle="toggleDrawer"
    />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import '@/assets/fonts/icomoon/style.css';
import { navigation } from './components';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'App',

  components: { navigation },

  data: () => ({
    items: [
      { title: 'Add Location', icon: 'icon-add-place' },
    ],
  }),
  computed: {
    ...mapGetters([
      'drawer',
      'currentLocation'
    ])
  },
  methods: {
    ...mapMutations([
      'toggleDrawer'
    ])
  }
};
</script>
