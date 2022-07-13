<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CrossMark',

  props: {
    large: {
      type: Boolean,
      required: false,
      default: true
    },
    medium: {
      type: Boolean,
      required: false,
      default: false
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<template>
  <svg
    class="crossmark"
    :class="{
      'is-large': large,
      'is-medium': medium,
      'is-small': small
    }"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    <circle
      class="crossmark-circle"
      cx="26"
      cy="26"
      r="25"
      fill="#DB1B1B"
    />

    <path
      class="crossmark-check"
      fill="none"
      d="M16 16 36 36 M36 16 16 36"
    />
  </svg>
</template>

<style lang="scss" scoped>
  .crossmark {
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: $white;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px $error-color;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;

    &.is-large {
      width: 48px;
      height: 48px;
    }

    &.is-medium {
      width: 32px;
      height: 32px;
    }

    &.is-small {
      width: 24px;
      height: 24px;
    }
  }

  .crossmark-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: $error-color;
    fill: none;
    animation: stroke .6s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards;
  }

  .crossmark-check {
    transform-origin: 50% 50%;
    stroke-dasharray: 29;
    stroke-dashoffset: 29;
    animation: stroke .3s cubic-bezier(0.650, 0.000, 0.450, 1.000) .8s forwards;
  }

  @keyframes stroke {
    100% { stroke-dashoffset: 0; }
  }

  @keyframes scale {
    0%, 100% { transform: none; }
    50% { transform: scale3d(1.1, 1.1, 1); }
  }

  @keyframes fill {
    100% { box-shadow: inset 0px 0px 0px 30px $error-color; }
  }
</style>
