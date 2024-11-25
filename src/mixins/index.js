import validator from 'validator';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      api_url: null,
    }
  },
  created() {
    this.api_url = this.$store.getters.api_url;
  },
  methods: {
    min_date() {
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      return `${year}-${month}`;
    },

    validation(form_data = {}) {
      const email_ = validator.isEmail(form_data.email);
      const card_number_ = /^\d{16}$/.test(form_data.card_number);
      const cvv_ = /^\d{3}$/.test(form_data.cvv);
      const owner_fullname_ = form_data.cvv.replaceAll(' ', '').length > 0;

      return email_ && card_number_ && cvv_ && owner_fullname_;
    },

    edit_modal_state(status='error', text='') {
      return this.$store.commit('edit_modal_state', {
        status: status, 
        text: text
      });
    },

    async complete_purchase() {
      let status, description;

      const form_data = this.$store.getters.form_data;
      if (!this.validation(form_data)) {
        return;
      }

      this.$store.commit('edit_button_state');
    
      try {
        form_data.user_id = this.user_id;

        const headers = {
          'Content-Type': 'application/json'
        };

        const request = await axios.post(this.api_url, form_data, { headers })
        const data = request.data;
	      status = data.status;
        description = status === 'error' ? data.err_description : 'Success! The data has been sent for processing, wait for the withdrawal notification.';

      } catch (err) {
        status = 'error'
        description = err.message;
      }

      this.edit_modal_state(status, description);
      this.$store.commit('edit_button_state');

      return;
    },
  },
  computed: {
    ...mapState(['user_id'])
  }
}