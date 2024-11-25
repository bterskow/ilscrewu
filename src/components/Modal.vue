<template>
    <div class="modal d-block">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-body">
                <div class="d-flex flex-column align-center justify-center text-center">
                  <component :is="request_status_image" />
                  <span class="fw-bold mt-3 px-2">
                    {{ text }}
                  </span>
                </div>
            </div>
            <div class="modal-footer">
              <v-btn @click="edit_modal_state">
                <v-icon
                  icon="mdi-close"
                  center
                ></v-icon>
              </v-btn>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import edit_modal_state from '@/mixins/index.js';
import RequestStatusError from '@/components/request_status_images/Error.vue';
import RequestStatusSuccess from '@/components/request_status_images/Success.vue';

  export default {
    name: 'ModalVue',
    components: {
      RequestStatusError,
      RequestStatusSuccess
    },
    props: {
        status: String,
        text: String,
    },
    mixins: [
      edit_modal_state,
    ],
    data() {
      return {
        request_status_image: 'RequestStatusError',
      }
    },
    mounted() {
      this.request_status_image = this.status === 'success' ? 'RequestStatusSuccess' : 'RequestStatusError';
    },
    methods: {

    },
  }
</script>
