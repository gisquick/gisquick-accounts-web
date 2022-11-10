<template>
  <base-page class="activation-page">

    <v-spinner v-if="processing"/>
    <template v-if="success">
      <h1>Your account was activated!</h1>
      <v-btn
        class="my-4"
        color="primary"
        href="/"
      >
        Continue to homepage
      </v-btn>
    </template>
    <template v-if="error">
      <div v-if="newPasswordRequired" class="f-col">
        <p class="text-center">Set a new password to activate your account</p>
        <new-password-form submit-text="Activate" @submit="activate"/>
      </div>
      <p v-else class="error text-center" v-text="errorText"/>
    </template>

  </base-page>
</template>

<script>
import BasePage from '@/BasePage.vue'
import VBtn from '@/ui/Button.vue'
import VSpinner from '@/ui/Spinner.vue'
import NewPasswordForm from '@/components/NewPasswordForm.vue'

export default {
  components: {
    BasePage,
    VBtn,
    VSpinner,
    NewPasswordForm
  },
  data () {
    return {
      processing: false,
      error: null,
      success: false
    }
  },
  computed: {
    alreadyActivated () {
      return this.error?.status === 409
    },
    newPasswordRequired () {
      return this.error?.status === 412
    },
    errorText () {
      const { status, message } = this.error
      if (status === 400 && message === 'Invalid activation link') {
        return 'Invalid or expired activation link'
      }
      return 'There was a problem with activation of your account!'
    }
  },
  created () {
    this.activate()
  },
  methods: {
    async activate (data = null) {
      this.processing = true
      this.error = null
      const endpoint = data ? 'new_password' : 'activate'
      const response = await fetch(`/api/accounts/${endpoint}/${location.search}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : null
      })
      this.processing = false
      if (response.ok) {
        this.success = true
      } else {
        this.success = false
        const error = { status: response.status }
        try {
          const { message } = await response.json()
          error.message = message
        } catch (err) {}
        this.error = error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  font-size: 18px;
}
</style>
