<template>
  <v-card
    :color="active ? 'primary darken-2' : ''"
    class="ma-1 rounded-xl bg-linear-blue"
    @click="toggle"
    max-width="calc(100vw - 4rem)"
    :to="url"
    :loading="loading"
    :loader-height="100"
  >
    <template slot="progress" class="w-100 h-100">
      <v-progress-linear
        height="8"
        color="white"
        indeterminate
      />
    </template>
    <v-card-text class="white--text">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="d-flex align-center justify-space-between">
            <div>
              <p class="body-2 ma-0">
                {{ info.description }}
              </p>
              <p class="text-h5 mb-5">
                {{ info.main }}
              </p>
              <atomLabel
                icon="icon-pin"
                iconSize="small"
                :text="data.name || ''"
                textSize="body-2"
                color="white"
              />
            </div>
            <v-img
              :src="`http://openweathermap.org/img/wn/${imgCode}@2x.png`"
              alt="weather image"
              :max-width="125"
            />
          </div>
        </v-col>
        <v-col cols="12" class="pt-0">
          <div class="d-flex align-center justify-space-between">                
            <atomLabel
              :text="`${main.temp ? main.temp.toFixed(0) : 0}&deg;<sup>F</sup>`"
              textSize="text-h5"
              color="white"
            />
            <atomLabel
              icon="icon-humidity"
              iconSize="small"
              :text="`${main.humidity || 0}%`"
              textSize="body-2"
              color="white"
            />
            <atomLabel
              icon="icon-wind"
              iconSize="small"
              :text="`${windSpeed || 0} mp/h`"
              textSize="body-2"
              color="white"
            />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { atomLabel } from '../';
import { first, isEmpty } from 'lodash';
import qs from 'querystring';

export default {
  components: { atomLabel },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    main() {
      return this.data.main || {}
    },
    info() {
      const { weather } = this.data
      if (!isEmpty(weather)) return first(weather)
      return { main: 0, description: '-' }
    },
    url() {
      const { name, coord } = this.data
      if (name && coord) return `/${name}?${qs.stringify(coord)}`

      return '/'
    },
    windSpeed() {
      return this.data.wind ? this.data.wind.speed : 0
    },
    imgCode() {
      const { data } = this
      if (data && !isEmpty(data.weather)) {
        const { icon } = first(data.weather)
        return icon
      }
      return '01d'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  &__progress {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.bg-linear-blue {
  background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);;
}
</style>
