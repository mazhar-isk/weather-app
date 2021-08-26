import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'querystring'
import _ from 'lodash'

Vue.use(Vuex)

const apiKey = process.env.VUE_APP_API_KEY

const store = new Vuex.Store({
  state: {
    weatherCollection: {},
    weatherDetail: {},
    currentLocation: {},
    drawer: null,
    isFetching: false,
    errorMessage: null
  },
  actions: {
    fetchWeather({ commit }, payload) {
      payload.appid = apiKey
      payload = '?' + qs.stringify(_.pickBy(payload, _.identity))
      const url = `/data/2.5/weather${payload}`

      commit('FETCHING')
      axios.get(url)
        .then(res => {
          const { name, coord } = res.data
          commit('SET_WEATHERS', res.data)
          commit('SET_CURRENT_LOCATION', { name, ...coord })
        })
        .catch(err => commit('SET_ERROR',  err.message))
        .finally(() => commit('FETCHED'))
    },
    fetchWeatherDetail({ commit }, payload) {
      payload.appid = apiKey
      payload = '?' + qs.stringify(_.pickBy(payload, _.identity))
      const url = `/data/2.5/onecall${payload}`

      commit('FETCHING')
      axios.get(url)
        .then(res => commit('SET_WEATHER_DETAIL', res.data))
        .catch(err => commit('SET_ERROR',  err.message))
        .finally(() => commit('FETCHED'))
    }
  },
  mutations: {
    toggleDrawer: state => {
      state.drawer = !state.drawer
      return state
    },
    resetState: state => {
      state.isFetching = false
      state.errorMessage = null
      return state
    },
    FETCHING: state => {
      state.isFetching = true
      return state
    },
    FETCHED: state => {
      state.isFetching = false
      return state
    },
    SET_CURRENT_LOCATION: (state, data) => {
      state.currentLocation = data
      return state
    },
    SET_WEATHERS: (state, data) => {
      state.weatherCollection = data
      return state
    },
    SET_WEATHER_DETAIL: (state, data) => {
      state.weatherDetail = data
      return state
    },
    SET_ERROR: (state, message) => {
      state.errorMessage = message
      return state
    },

  },
  getters: {
    drawer: state => state.drawer,
    weatherCollection: state => state.weatherCollection,
    weatherDetail: state => state.weatherDetail,
    isLoading: state => state.isFetching,
    currentLocation: state => state.currentLocation
  }
})

export default store