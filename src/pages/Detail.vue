<template>
  <v-row justify="space-around">
    <v-card width="400" :loading="isLoading">
      <template slot="progress" class="w-100 h-100">
        <v-progress-linear
          height="8"
          color="white"
          indeterminate
        />
      </template>
      <div
        class="bg-linear-blue rounded-b-xl rounded-t-0"
      >
        <v-app-bar
          flat
          color="rgba(0, 0, 0, 0)"
        >
          <v-icon @click="$router.go(-1)" color="white" small>icon-back</v-icon>
          <v-spacer />

          <v-toolbar-title class="text-h6 white--text pl-0">
            {{ cityName }}
          </v-toolbar-title>

          <v-spacer />
          <v-icon color="white">icon-more</v-icon>
        </v-app-bar>

        <v-card-text class="white--text text-center">
          <div>
            <v-btn-toggle
              :value="units"
              @change="onChangeUnit"
              background-color="transparent"
              borderless
              rounded
            >
              <v-btn>Fahrenheit</v-btn>
              <v-btn>Celcius</v-btn>
            </v-btn-toggle>
          </div>
          <img
            alt="weather"
            :src="`http://openweathermap.org/img/wn/${getWeather.icon || '01n'}@2x.png`"
          />
          <p class="text-h3">
            {{ `${current.temp ? current.temp.toFixed(0) : '0'}&deg;` }}
          </p>
          <p class="body-1">{{ coordinate }}</p>
          <p class="text-h5 font-weight-bold text-capitalize">
            {{ getWeather.description }}
          </p>
          <p class="body-1">{{ currentDate }}</p>
        </v-card-text>
      </div>

      <v-card-text>
        <v-subheader>Details</v-subheader>
        <v-row>
          <v-col
            v-for="({ icon, value, label}, idx) in cardDetails"
            :key="idx"
            cols="6"
          >
            <weather-card :icon="icon" :value="value" :label="label" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-subheader>Tips</v-subheader>
        <v-card class="pa-4 rounded-lg">
          <div class="d-flex align-items-center">
            <img alt="tips" src="@/assets/tips.svg" height="25px" />
            <p class="subtitle-1 mb-0 ml-2">Its ok to hangout with your friend!</p>
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
  // import qs from 'querystring';
  import moment from 'moment';
  import { first } from 'lodash';
  import { mapActions, mapGetters } from 'vuex';
  import { weatherDetail as weatherCard } from '../components';

  export default {
    components: { weatherCard },
    data: () => ({
      cityName: '',
      units: 0,
      cardDetails: [
        {
          label: 'Fahrenheit',
          icon: 'icon-temp',
          value: '0',
        },
        {
          label: 'Pressure',
          icon: 'icon-wind',
          value: '0',
        },
        {
          label: 'UV Index',
          icon: 'icon-uv',
          value: '0',
        },
        {
          label: 'Humidity',
          icon: 'icon-humidity',
          value: '0',
        }
      ]
    }),
    computed: {
      ...mapGetters([ 'weatherDetail', 'isLoading' ]),
      coordinate() {
        const { lat, lon } = this.weatherDetail
        let val = '0, 0'
        if (lat && lon) val = `${lat}, ${lon}`

        return  val
      },
      current() {
        return this.weatherDetail.current || {}
      },
      getWeather() {
        const { current } = this.weatherDetail
        let data = {}
        if (current && current.weather) {
          data = first(current.weather)
        }
        return data
      },
      currentDate() {
        return moment().format('dddd, DD MMMM YYYY')
      },
    },
    watch: {
      'weatherDetail.current': function(val) {
        Object.assign(this.cardDetails, [
          {
            label: this.units ? 'Celcius' : 'Fahrenheit',
            icon: 'icon-temp',
            value: `${val.temp ? val.temp.toFixed(0) : '0'}&deg;`,
          },
          {
            label: 'Pressure',
            icon: 'icon-wind',
            value: `${val.wind_speed} mp/h`,
          },
          {
            label: 'UV Index',
            icon: 'icon-uv',
            value: `${val.uvi}`,
          },
          {
            label: 'Humidity',
            icon: 'icon-humidity',
            value: `${val.humidity}%`,
          }
        ])
      }
    },
    mounted() {
      this.cityName = this.$route.params.id
      this.fetchData()
    },
    methods: {
      ...mapActions({ fetchWeatherDetail: 'fetchWeatherDetail' }),
      onChangeUnit(val) {
        this.units = val
        this.fetchData()
      },
      fetchData() {
        const payload = {
          ...this.$route.query,
          lang: 'id',
          units: this.units ? 'metric' : 'standard',
        }
        this.fetchWeatherDetail(payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
.bg-linear-blue {
  background: linear-gradient(180deg, #3CD18A 0%, #3C6FD1 0.01%, #7CA9FF 100%);
}
.v-btn ::v-deep{
  text-transform: unset !important;
}
</style>
