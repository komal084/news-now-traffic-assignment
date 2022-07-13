<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',

  props: {
    isLarge: {
      type: Boolean,
      required: false,
      default: false
    },

    isOutlined: {
      type: Boolean,
      required: false,
      default: false
    },

    isBlackOutlined: {
      type: Boolean,
      required: false,
      default: false
    },

    isBlackButton: {
      type: Boolean,
      required: false,
      default: false
    },

    isRedButton: {
      type: Boolean,
      required: false,
      default: false
    },

    isBlueButton: {
      type: Boolean,
      required: false,
      default: false
    },

    isDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<template>
  <button
    class="button align-items justify-center"
    :class="{
      'is-large': isLarge,
      'is-outlined': isOutlined,
      'is-black-outlined': isBlackOutlined,
      'is-black-button': isBlackButton,
      'is-red-button': isRedButton,
      'is-blue-button': isBlueButton,
      'is-disabled': isDisabled
    }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .button {
    color: $white;
    font-size: $font-size-lg;
    font-weight: normal;
    border: solid 1px $primary-color;
    border-radius: $button-radius;
    background: none;
    background-color: $primary-color;
    outline: 0;
    padding: $button-padding-y-sm $button-padding-x-sm;
    cursor: pointer;
    transition: all 200ms ease;

    i {
      margin-right: $spacer-sm;
      font-size: $font-size-xl;
    }

    &:hover {
      background-color: $primary-darken-1-color;
    }

    &:active {
      background-color: $primary-darken-2-color;
    }

    &.is-large {
      padding: $button-padding-y $button-padding-x;
    }

    &.is-outlined {
      background-color: $white;
      color: $primary-color;
      border-color: $primary-color;
    }

    &.is-black-outlined {
      background-color: $white;
      color: $black;
      border-color: $black;
    }

    &.is-black-button {
      background-color: $black;
      color: $white;
      border-color: $black;
    }

    &.is-red-button {
      background-color: $error-color;
      color: $white;
      border-color: $error-color;

      &.is-active, &:hover {
        border-color: $candy-pink;
        background-color: $candy-pink;
      }
    }

    &.is-blue-button {
      background-color: $secondary-color;
      color: $white;
      border-color: $secondary-color;

      &.is-active, &:hover {
        border-color: $secondary-darken-2-color;
        background-color: $secondary-darken-2-color;
      }
    }

    &.is-disabled {
      background-color: $gray-200;
      color: $gray;
      border-color: $gray-200;
      cursor: default;
      
      &:hover, &:focus, &:active, &.is-active {
        background-color: $gray-200;
        border-color: $gray-200;
        color: $gray;
        cursor: default;

        * { color: $gray; }
      }

      * {
        cursor: default;
        color: $gray;
      }
    }
  }
</style>
