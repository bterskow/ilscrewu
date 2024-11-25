<template>
  <img :src="request_error" class="img-fluid request-status-image" />
</template>

<script>
import request_error from '@/assets/request-error.png';

  export default {
    name: 'RequestStatusError',
    data() {
      return {
        request_error: request_error
      }
    },
    methods: {

    },
  }
</script>
