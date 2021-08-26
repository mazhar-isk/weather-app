<template>
  <div class="d-flex align-center">
    <v-icon
      v-if="icon"
      :color="color"
      class="mr-1"
      :x-small="iconSize === 'x-small'"
      :small="iconSize === 'small'"
      :x-large="iconSize === 'x-large'"
      :large="iconSize === 'large'"
    >
      {{ icon }}
    </v-icon>
    <p :class="`${textSize} ${color ? color + '--text' : ''} ma-0`" v-html="text" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: [String, Boolean],
      default: undefined
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    textSize: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: ''
    }
  }
}
</script>
