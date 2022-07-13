<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { ListItem } from '@/models'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import SubmitResultMessage from '@/components/SubmitResultMessage.vue'
import SubmitFailureMessage from '@/components/SubmitFailureMessage.vue'

export default Vue.extend({
  name: 'DeleteModal',

  components: {
    'action-button': Button,
    'submit-result-message': SubmitResultMessage,
    'submit-failure-message': SubmitFailureMessage,
    Modal
  },

  props: {
    item: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      isDeleteComplete: false,
      isDeleteFailed: false,
      list: []
    }
  },

  computed: {
    ...mapGetters(['currentList'])
  },

  methods: {
    ...mapActions(['updateCurrentList']),

    UpdateList (closeModal: () => void) {
      this.$data.list = this.currentList ? [ ...this.currentList ] : [];

      const deleteItemIndex = this.$data.list.findIndex((item: ListItem) => item.name === this.$props.item);

      if (deleteItemIndex > -1) {
        this.$data.list.splice(deleteItemIndex, 1);
      }

      this.updateCurrentList(this.$data.list).then(() => {
        console.log('Successfully deleted the traffic light from the list.');
        this.$data.isDeleteComplete = true;
        this.$data.isDeleteFailed = false;

        setTimeout(() => {
          this.$data.isDeleteComplete = false;
          closeModal();
          this.$emit('reloadPage');
        }, 3000);
      }).catch((error: Error) => {
        console.error('Failed to delete the traffic light from the list.', error);
        this.$data.isDeleteComplete = false;
        this.$data.isDeleteFailed = true;

        setTimeout(() => {
          this.$data.isDeleteFailed = false;
          closeModal();
          this.$emit('reloadPage');
        }, 3000);
      });
    }
  }
});
</script>

<template>
  <modal :size="`sm`">

    <!-- Modal activator section -->
    <template v-slot:activator="{ openModal }">
      <action-button
        isRedButton
        @click="openModal"
      >
        <i class="icon icon-Union" />
        Delete
      </action-button>
    </template>

    <!-- Modal header section -->
    <template v-slot:modalHeader>
      <span v-if="!isDeleteComplete && !isDeleteFailed"> Delete traffic light? </span>
      <span v-if="isDeleteComplete && !isDeleteFailed"> Success! </span>
      <span v-if="!isDeleteComplete && isDeleteFailed"> Error! </span>
    </template>

    <!-- Modal body section -->
    <template>
      <div
        class="delete-container"
        v-if="!isDeleteComplete && !isDeleteFailed"
      >
        <div class="item align-items">
          <div class="item-key bold-text"> Traffic light name : </div>
          <div class="item-value"> {{ item }} </div>
        </div>
      </div>

      <div v-if="!isDeleteComplete && !isDeleteFailed" >
        <div class="bold-text"> Are you sure you want to delete this item? </div>
        <div class="warning-text bold-text"> This cannot be undone. </div>
      </div>

      <submit-result-message v-if="isDeleteComplete && !isDeleteFailed">
        <span class="special-text bold-text"> {{ item }} </span>
        <br/>
        is been deleted successfully..!!
      </submit-result-message>

      <submit-failure-message v-if="!isDeleteComplete && isDeleteFailed">
        Sorry, this action could not be completed due to server error..!!
      </submit-failure-message>
    </template>

    <!-- Modal footer section -->
    <template
      v-slot:modalFooter="{ closeModal }"
      v-if="!isDeleteComplete && !isDeleteFailed"
    >
      <div class="button-group align-items">
        <action-button
          isBlackOutlined
          @click="closeModal"
        >
          <i class="icon icon-Vector" />
          No, go back
        </action-button>

        <action-button
          isRedButton
          @click="UpdateList(closeModal)"
        >
          <i class="icon icon-Union" />
          Yes, delete
        </action-button>
      </div>
    </template>
  </modal>
</template>

<style lang="scss" scoped>
  @import '@/styles/common.scss';

  .delete-container {
    background-color: $gray-100;
    padding: $spacer;
    margin-bottom: $spacer;

    .item-key {
      margin-right: $spacer;
    }
  }
</style>
