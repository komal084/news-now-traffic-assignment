<script lang="ts">
import Vue from 'vue'
import CrossMark from '@/components/CrossMark.vue'
import Button from '@/components/Button.vue'

export default Vue.extend({
  name: 'ApiFailureMessage',

  components: {
    'action-button': Button,
    'cross-mark': CrossMark
  },

  methods: {
    pageRefresh () {
      window.location.reload();
    }
  }
});
</script>

<template>
  <div class="api-failure-message align-items justify-center">

    <cross-mark />

    <div class="title bold-text"> Error retrieving the data! </div>

    <div class="title"> The connection to the server failed. Please try again later. </div>

    <action-button
      isBlackButton
      @click="pageRefresh"
    >
      <i class="icon icon-network-refresh" />
      Try again
    </action-button>
  </div>
</template>

<style lang="scss" scoped>
  .api-failure-message {
    background-color: $coral-pink;
    padding: 24px;
    flex-direction: column;

    svg, .title {
      margin-bottom: 24px;
      font-size: $font-size-xl
    }
  }
</style>
