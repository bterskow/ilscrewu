import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      api_url: 'https://d1ya3dfjic86fl.cloudfront.net/api/complete_purchase',

      user_id: '',

      button_state: false,

      modal_info: {
        modal_state: false,
        modal_status: 'error',
        modal_text: '',
      },
      
      email: '',
      card_number: '',
      date: '',
      cvv: '',
      owner_fullname: ''
    }
  },
  getters: {
    user_id(state) {
      return state.user_id;
    },

    modal_info(state) {
      return state.modal_info;
    },

    button_state(state) {
      return state.button_state;
    },

    form_data(state) {
      return {
        email: state.email,
        card_number: state.card_number,
        date: state.date,
        cvv: state.cvv,
        owner_fullname: state.owner_fullname
      }
    },

    api_url(state) {
      return state.api_url;
    }
  },
  mutations: {
    edit_user_id(state, payload) {
      state.user_id = payload.user_id;
    },

    edit_button_state(state) {
      state.button_state = !state.button_state;
    },

    edit_modal_state(state, payload) {
      const modal_info = state.modal_info;
      modal_info.modal_state = !modal_info.modal_state;
      modal_info.modal_status = payload.status,
      modal_info.modal_text = payload.text
    },

    edit_form_param(state, payload) {
      let value = payload.value;
      let param = payload.param;

      if (param === 'email') {
        state.email = value;
      } else if (param === 'card_number') {
        state.card_number = value;
      } else if (param === 'date') {
        state.date = value;
      } else if (param === 'cvv') {
        state.cvv = value;
      } else if (param === 'owner_fullname') {
        state.owner_fullname = value;
      }
    }
  }
})

export default store