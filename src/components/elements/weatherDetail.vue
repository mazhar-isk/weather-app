<template>
  <v-card hover class="pa-4 rounded-lg">
    <v-row dense align="center">
      <v-col cols="4">
        <v-icon color="primary" x-large>
          {{ icon }}
        </v-icon>
      </v-col>
      <v-col cols="8">
        <div>
          <p
            class="subtitle-1 mb-0 font-weight-bold"
            v-html="value"
          />
          <p class="mb-0 body-1">
            {{ label }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'icon-temp'
    },
    value: {
      type: String,
      default: '0'
    },
    label: {
      type: String,
      default: '',
    }
  }
}
</script>
