<template>
  <HeaderVue />
  <ContentVue />
  <FooterVue />

  <ModalVue v-if="modal_info.modal_state" :status="modal_info.modal_status" :text="modal_info.modal_text" />
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import ContentVue from '@/components/Content.vue';
import FooterVue from '@/components/Footer.vue';
import ModalVue from '@/components/Modal.vue';
import { mapState } from 'vuex';

  export default {
    name: 'PageVue',
    props: {
      user_id: String,
    },
    components: {
      HeaderVue,
      ContentVue,
      FooterVue,
      ModalVue,
    },
    data() {
      return {

      }
    },
    created() {
      $('head > title').text('Checkout | Revolut');
      this.$store.commit('edit_user_id', {
        user_id: this.user_id
      });
      // console.log(this.user_id)
    },
    methods: {

    },
    computed: {
      ...mapState(['modal_info'])
    }
  }
</script>
