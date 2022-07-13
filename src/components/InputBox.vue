<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputBox',

  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    errorMessages: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  model: {
    prop: 'value',
    event: 'input'
  }
});
</script>

<template>
  <label
    class="inputbox"
    :class="{ 'is-error': error }"
  >
    <div
      v-if="label"
      class="label"
    >
      {{ label }}
    </div>

    <div class="inputbox-container">
      <input
        v-bind="$props"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('keyup', $event)"
        ref="input"
      />

      <div
        class="error-messages align-items"
        v-if="error && errorMessages.length"
      >
        <i class="icon icon-warning" />
        <span
          class="error"
          v-for="e in errorMessages"
          :key="e"
        >
          {{ e }}
        </span>
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .inputbox {
    .label {
      padding-bottom: 8px;
      font-size: $input-label-base;
      font-weight: bold;
    }

    .inputbox-container {
      input {
        height: $input-height;
        border: 1px solid $black;
        padding: $input-padding-y $input-padding-x;
        box-sizing: border-box;
        border-radius: $border-radius;
        box-shadow: $drop-shadow;
        width: 100%;
        transition: all 400ms $ease-out-circ;
        font-size: $font-size-lg;
        font-weight: normal;

        &::placeholder {
          color: $gray;
          font-weight: normal;
          font-size: $font-size-base;
        }

        &:focus {
          outline: none;
          border: 2px solid $primary-color;
        }
      }

      .error-messages {
        color: $error-color;
        margin-top: 8px;
        font-size: $font-size-base;
        font-weight: normal;

        i {
          color: $error-color;
          font-size: $font-size-base;
          margin-right: 8px;
        }
      }
    }

    &.is-error {
      input {
        border-color: $error-color;

        &:focus {
          border-color: $error-color;
        }
      }
    }
  }
</style>
