<script lang="ts">
import Vue from 'vue'
import CheckMark from '@/components/CheckMark.vue'

export default Vue.extend({
  name: 'SubmitResultMessage',

  components: {
    'check-mark': CheckMark
  },

  props: {
    status: {
      type: String,
      required: false,
      default: 'success'
    }
  }
});
</script>

<template>
  <div
    role="alert"
    class="submit-result-message"
    :class="{ [`submit-result-message-${status}`]: status }"
  >
    <div class="icon-wrapper">
      <check-mark />
    </div>

    <div class="submit-result-message-title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .submit-result-message {
    padding: 16px;
    margin-top: 26px;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    background-color: $pistachio-green;

    .submit-result-message-title {
      font-size: $font-size-lg;
    }

    .submit-result-message-body {
      margin-top: $spacer-sm;
    }

    .icon-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: $spacer-xl;
    }
  }
</style>
