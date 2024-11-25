<template>
  <HeaderVue />

  <div class="w-100 h-100 error404-block d-flex align-center justify-center">
    <div class="w-100 container py-5 d-flex flex-column text-center">
        <div class="w-100 d-flex justify-center mb-4">
            <img :src="errorImage" class="img-fluid error404-image" />
        </div>
        <h1 class="mb-4">We can’t find that one</h1>
        <span class="mb-4">We update our website regularly, so this page may have been moved, removed, or the URL wasn’t quite right.</span>
        <span>Explore the latest from Revolut this way...</span>
    </div>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import errorImage from '@/assets/error.png';

  export default {
    name: 'Error404Vue',
    components: {
        HeaderVue
    },
    data() {
      return {
        errorImage: errorImage,
      }
    },
    mounted() {
        $('head > title').text('404 | Revolut');
    },
    methods: {

    },
  }
</script>
