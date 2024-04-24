
<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFacebook } from '@mdi/js';

export default {
  name: "MyComponent",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiFacebook,
    }
  }
}
</script>