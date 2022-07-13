<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Spinner',

  props: {
    large: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false,
      default: '#000'
    }
  },

  data () {
    return {
      spinnerStyle: {
        borderColor: `${this.$props.color} transparent transparent transparent`
      }
    };
  }
});
</script>

<template>
  <div
    aria-label="loading ..."
    aria-live="polite"
    role="status"
    class="spinner"
    :class="{
      'is-small': small,
      'is-large': large
    }"
  >
    <div :style="spinnerStyle" />
    <div :style="spinnerStyle" />
    <div :style="spinnerStyle" />
    <div :style="spinnerStyle" />
    <div :style="spinnerStyle" />
  </div>
</template>

<style lang="scss" scoped>
  .spinner {
    display: inline-block;
    position: relative;
    width: $spinner-size;
    height: $spinner-size;

    div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: $spinner-size * 0.8;
      height: $spinner-size * 0.8;
      margin: $spinner-border-width;
      border: $spinner-border-width solid $white;
      border-radius: 50%;
      animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: $white transparent transparent transparent;
    }

    div:nth-child(1) {
      animation-delay: -0.45s;
    }

    div:nth-child(2) {
      animation-delay: -0.3s;
    }

    div:nth-child(3) {
      animation-delay: -0.15s;
    }

    .is-large {
      width: $spinner-size-lg;
      height: $spinner-size-lg;

      div {
        width: $spinner-size-lg * 0.8;
        height: $spinner-size-lg * 0.8;
        margin: $spinner-border-width;
        border-width: $spinner-border-width;
      }
    }

    .is-small {
      width: $spinner-size-sm;
      height: $spinner-size-sm;

      div {
        width: $spinner-size-sm * 0.8;
        height: $spinner-size-sm * 0.8;
        margin: $spinner-border-width-sm;
        border-width: $spinner-border-width-sm;
      }
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
