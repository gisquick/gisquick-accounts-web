<template>
  <base-page>
    <h1 v-if="!submitted">Create a New Account</h1>
    <h1 v-else>Account was created</h1>
    <sign-up-form
      v-if="!submitted"
      @submit="submitted = true"
    />
    <p v-else class="text-center">
      Before you can sign in, you must active your account. Activation link was sent to your email address.
    </p>
    <popup-layer class="light"/>
  </base-page>
</template>

<script>
import BasePage from '@/BasePage'
import SignUpForm from './SignUpForm'
import PopupLayer from '@/ui/PopupLayer.vue'
import '@/ui/transitions.scss'

export default {
  components: {
    BasePage,
    SignUpForm,
    PopupLayer
  },
  data () {
    return {
      submitted: false
    }
  }
}
</script>

<style lang="scss">
.dialog {
  overflow: auto;
  overscroll-behavior: contain;
  width: clamp(300px, 800px, calc(100% - 16px));
  max-height: 90vh;
  align-self: center;
  justify-self: center;
  padding: 16px 24px;
  border-radius: 4px;
  // dark
  // background-color: #222;
  // light
  background-color: #eee;
  color: #222;
  @media (max-width: 600px) {
    padding: 12px;
  }
}
</style>
