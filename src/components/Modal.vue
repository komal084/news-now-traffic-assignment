<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Modal',

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: String,
      required: false,
      default: 'md'
    }
  },

  data () {
    return {
      isOpen: false
    };
  },

  methods: {
    openModal (): void {
      this.$data.isOpen = true;
    },

    closeModal (): void {
      this.$data.isOpen = false;
    }
  }
});
</script>

<template>
  <div>
    <slot
      name="activator"
      :openModal="openModal"
    />

    <div
      class="modal"
      :class="{ 'is-open': value || isOpen }"
    >
    <div
      class="background"
      @click="closeModal"
    />

    <div
      class="modal-body"
      :class="`size-${size}`"
    >
      <div class="modal-header">
        <slot
          name="modalHeader"
          :closeModal="closeModal"
        />
      </div>

      <a
        class="close-button align-items"
        @click="closeModal"
      >
        <span> Close </span>
        <i class="icon icon-clear" />
      </a>

      <slot :closeModal="closeModal" />

      <div class="modal-footer align-items justify-flex-end">
        <slot
          name="modalFooter"
          :closeModal="closeModal"
        />
      </div>
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .modal {
    display: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    box-sizing: border-box;

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.35);
    }

    &.is-open {
      display: block;
    }

    .close-button {
      padding: $spacer-sm;
      position: absolute;
      right: $spacer;
      top: $spacer-lg;
      cursor: pointer;

      .icon-clear {
        font-size: $font-size-xsm;
      }

      span {
        padding-right: $spacer-sm;
        font-size: $font-size-sm;
      }
    }

    .modal-header {
      font-size: $font-size-4xl;
      font-weight: 300;
      text-align: left;
      margin-bottom: 16px;
    }

    .modal-body {
      position: absolute;
      top: 50%;
      max-height: 85%;
      overflow-y: auto;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      background-color: $white;
      padding: $spacer-lg;
      border-radius: 10px;
      box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.25);

      &.size-xsm { max-width: 340px; }

      &.size-sm { max-width: 400px; }

      &.size-md { max-width: 512px; }

      &.size-lg { max-width: 632px; }

      &.size-xlg { max-width: 672px; }
    }

    .modal-footer {
      width: 100%;
      margin-top: $spacer-xl;

      .button {
        margin-left: $spacer-sm;
      }
    }
  }
</style>
