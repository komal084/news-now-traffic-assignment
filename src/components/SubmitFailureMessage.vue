<script lang="ts">
import Vue from 'vue'
import CrossMark from '@/components/CrossMark.vue'

export default Vue.extend({
  name: 'SubmitFailureMessage',

  components: {
    'cross-mark': CrossMark
  }
});
</script>

<template>
  <div class="submit-failure-message">
    <div class="icon-wrapper align-items justify-center">
      <cross-mark />
    </div>
    <p class="submit-failure-message-title align-items justify-center">
      <slot />
    </p>
    <slot name="retry" />
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .submit-failure-message {
    padding: 16px;
    margin-top: 26px;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    background-color: $coral-pink;

    .submit-failure-message-title {
      font-size: $font-size-lg;
    }

    .icon-wrapper {
      margin-bottom: $spacer-xl;
    }
  }
</style>
