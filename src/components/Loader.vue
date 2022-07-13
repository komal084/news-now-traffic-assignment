<script lang="ts">
import Vue from 'vue'
import Spinner from '@/components/Spinner.vue'

export default Vue.extend({
  name: 'Loader',

  components: {
    Spinner
  },

  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    body: {
      type: String,
      required: false,
      default: ''
    }
  }
});
</script>

<template>
  <div
    class="loader"
    role="alert"
  >
    <h2 class="loader-title"> {{ title }} </h2>

    <spinner
      large
      :color="`#4A68F9`"
    />

    <p class="loader-text"> {{ body }} </p>
  </div>
</template>

<style lang="scss" scoped>
  .loader {
    padding: $spacer-3xl 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    .spinner {
      margin: $spacer-2xl auto;
    }

    .loader-title {
      font-size: $font-size-6xl;
      font-weight: normal;
    }

    .loader-text {
      font-size: $font-size-2xl;
      font-weight: normal;
      color: $gray-500;
    }
  }
</style>
