<template>
  <div>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-icon @click.stop="toggleDrawer" class="pa-3">
          icon-menu
        </v-icon>
        <p class="text-h5 ma-0">
          {{ currentLocation.name || ''}}
        </p>
        <v-icon class="pa-3">icon-gear</v-icon>
      </v-row>
    </v-container>

    <v-container class="pa-0">
      <v-slide-group v-model="model" center-active>
        <v-slide-item
          v-for="n in 1"
          :key="n"
          v-slot="{ active, toggle }"
        >
          <weather
            :active="active"
            :toggle="toggle"
            :data="weatherCollection"
            :loading="isLoading"
          />
        </v-slide-item>
      </v-slide-group>
    </v-container>
    <v-container>
      <v-subheader class="pl-0 text-h6">News</v-subheader>
      <v-row>
        <v-col cols="12" md="4" xl="3" class="px-0">
          <news />
        </v-col>
        <v-col cols="12" md="4" xl="3" class="px-0">
          <news />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapActions,
    mapGetters,
  } from 'vuex'
  import { weather, news } from '../components'

  export default {
    components: { weather, news },
    data() {
      return {
        model: null,
        lat: 0,
        lon: 0
      }
    },
    computed: {
      ...mapGetters([
        'weatherCollection',
        'currentLocation',
        'isLoading'
      ]),
    },
    mounted() {
      this.getLoc()
    },
    methods: {
      ...mapActions({ fetchWeather: 'fetchWeather' }),
      ...mapMutations(['toggleDrawer']),
      getLoc() {
        this.$getLocation()
          .then(({ lat, lng }) => {
            Object.assign(this, { lat, lon: lng })
            this.fetchCollection()
          })
      },
      fetchCollection() {
        const { lat, lon } = this
        this.fetchWeather({ lat, lon, lang: 'id' })
      }
    }
  }
</script>
