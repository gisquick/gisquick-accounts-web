<template>
  <base-page>
    <h1
      v-if="error"
      class="error--text"
    >
      There was a problem with activation of your account!
    </h1>
    <h1 v-else>Your account was activated!</h1>
  </base-page>
</template>

<script>
import BasePage from '@/BasePage'

export default {
  components: {
    BasePage
  },
  props: {
    error: Boolean
  }
}
</script>

<style lang="scss" scoped>
h1 {
  user-select: none;
  margin: 16px 8px;
}
</style>
