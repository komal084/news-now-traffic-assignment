<script lang="ts">
import Vue from 'vue'
import CheckMark from '@/components/CheckMark.vue'
import CrossMark from '@/components/CrossMark.vue'

export default Vue.extend({
  name: 'InlineHint',

  components: {
    'check-mark': CheckMark,
    'cross-mark': CrossMark
  },

  props: {
    isSuccess: {
      type: Boolean,
      required: false
    },
    isError: {
      type: Boolean,
      required: false
    }
  }
});
</script>

<template>
  <div
    class="inline-hint align-items"
    :class="{
      'isSuccess': isSuccess,
      'isError': isError
    }"
  >
    <check-mark
      medium
      v-if="isSuccess"
    />

    <cross-mark
      medium
      v-if="isError"
    />

    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .inline-hint {
    display: table;
    padding: 14px 16px;
    font-size: $font-size-base;

    &.isSuccess {
      color: $success-color;
    }

    &.isError {
      color: $error-color;
    }

    .checkmark, .crossmark {
      margin-right: 10px;
    }
  }
</style>
