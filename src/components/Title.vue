<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CardTitle'
});
</script>

<template>
  <div class="card-title">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .card-title {
    font-size: $font-size-2xl;
    padding-bottom: $spacer;
    margin-bottom: 25px;
    border-bottom: 1px solid $gray-500;

    i {
      font-size: $font-size-2xl;
      padding-right: 12px;
    }
  }
</style>
