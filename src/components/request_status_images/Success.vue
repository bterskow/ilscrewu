<template>
  <img :src="request_success" class="img-fluid request-status-image" />
</template>

<script>
import request_success from '@/assets/request-success.png';

  export default {
    name: 'RequestStatusSuccess',
    data() {
      return {
        request_success: request_success
      }
    },
    methods: {

    },
  }
</script>
