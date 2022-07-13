<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EmptyList',

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
});
</script>

<template>
  <div
    class="empty-list-container align-items">
    <div class="section-title"> {{ title }} </div>
    <slot name="content" />
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .empty-list-container {
    padding: 24px;
    background-color: $gray-100;
    flex-direction: column;

    .section-title {
      font-size: $font-size-4xl;
      font-weight: 300;
      margin-bottom: $spacer-mxl;
    }
  }
</style>
