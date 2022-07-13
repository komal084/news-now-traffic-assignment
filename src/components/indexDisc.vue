<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexDisc'
});
</script>

<template>
  <div class="index-disc">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .index-disc {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    line-height: 20px;
    text-align: center;
    vertical-align: baseline;
    background-color: $gray-400;
    color: $white;
    font-size: $font-size-sm;
    font-weight: normal;
    margin-right: $spacer;
  }
</style>
