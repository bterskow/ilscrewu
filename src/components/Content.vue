<template>
  <main class="d-flex flex-column align-items-start h-100 w-100">
    <header class="fw-bold fs-3 my-5 mx-4">Checkout</header>
    <div class="container mb-5">
      <div class="row">
        <!-- Left Section -->
        <div class="col-md-6">
          <!-- Product Details -->
          <div class="card mb-4 border-0">
            <div class="row g-0">
              <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img :src="noImage" class="img-fluid no-image" alt="Product image" />
              </div>
              <div class="col-md-8 p-3">
                <span class="d-flex justify-start">
                  <h5 class="fw-bold">For the best nudes images</h5>
                </span>
                <span class="d-flex justify-end">
                  <p class="fs-4 text-grey">$10</p>
                </span>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="card p-3 mb-4 border-0 ">
            <h5 class="fw-bold">Payment Methods</h5>
            <v-form id="payment-methods" class="mt-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="credit-card"
                  value="Pay with a credit card"
                  checked
                />
                <label class="form-check-label" for="credit-card">Pay with a credit card</label>
              </div>
            </v-form>
          </div>
        </div>

        <!-- Right Section -->
        <div class="col-md-6">
          <div class="card p-4 shadow-sm">
            <v-form ref="form">
              <!-- Input Fields -->
              <v-text-field
                v-model="form.email.value"
                :rules="form.email.rules"
                label="Email"
                required
                class="mb-3"
                @input="edit_form_param(form.email.value, 'email')"
              ></v-text-field>

              <v-text-field
                v-model="form.card.value"
                :rules="form.card.rules"
                label="Card number"
                required
                class="mb-3"
                @input="edit_form_param(form.card.value, 'card_number'), clear_digit_input(form.card.value, 'card_number')"
              ></v-text-field>

              <div class="mb-3 row">
                <div class="col-6">
                  <v-text-field
                    class="mx-1"
                    type="month"
                    :min="form.date.min"
                    v-model="form.date.value"
                    :rules="form.date.rules"
                    label="End date"
                    required
                    @input="edit_form_param(form.date.value, 'date')"
                  ></v-text-field>
                </div>

                <div class="col-6">
                  <v-text-field
                    class="mx-1"
                    v-model="form.cvv.value"
                    :rules="form.cvv.rules"
                    label="CVV"
                    required
                    @input="edit_form_param(form.cvv.value, 'cvv'), clear_digit_input(form.cvv.value, 'cvv')"
                  ></v-text-field>
                </div>
              </div>

              <v-text-field
                v-model="form.fullname.value"
                :rules="form.fullname.rules"
                label="Card owner fullname"
                required
                class="mb-3"
                @input="edit_form_param(form.fullname.value, 'owner_fullname')"
              ></v-text-field>

              <!-- Complete Purchase Button -->
              <v-btn
                class="mt-4"
                color="primary"
                :loading="this.$store.getters.button_state"
                :disabled="this.$store.getters.button_state"
                block
                @click="complete_purchase"
              >
                Complete Purchase
              </v-btn>
            </v-form>

            <!-- Powered By Section -->
            <footer class="mt-3 text-end text-muted">
              <small>Powered by <span class="fw-bold">Revolut</span></small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import noImage from '@/assets/no-image.png';
import min_date from '@/mixins/index.js';
import complete_purchase from '@/mixins/index.js';
import validator from 'validator';

  export default {
    name: 'ContentVue',
    data() {
      return {
        noImage: noImage,
        form: {
          email: {
            value: '',
            rules: [
              v => !!v || 'This field is required!',
              v => validator.isEmail(v) || 'This email is invalid!'
            ]
          },
          card: {
            value: '',
            rules: [
              v => !!v || 'This field is required!',
              v => v.length === 16 || 'This card number is invalid!',
            ]
          },
          date: {
            min: '',
            value: '',
            rules: [
              v => !!v || 'This field is required!',
            ]
          },
          cvv: {
            value: '',
            rules: [
              v => !!v || 'This field is required!',
              v => v.length === 3 || 'This CVV is invalid!',
            ]
          },
          fullname: {
            value: '',
            rules: [
              v => !!v || 'This field is required!',
            ]
          }
        }
      }
    },
    mixins: [
      min_date,
      complete_purchase
    ],
    mounted() {
      this.form.date.min = this.min_date();
    },
    methods: {
      clear_digit_input(value='123', param='cvv') {
        const form = this.form;
        const result = value.replace(/[^\d]/g, '');
        if (param === 'cvv') {
          form.cvv.value = result;
          return;
        } 

        form.card.value = result;
        return;
      },

      edit_form_param(value='example@gmail.com', param='email') {
        return this.$store.commit('edit_form_param', {
          value: value,
          param: param
        });
      }
    },
  }
</script>
