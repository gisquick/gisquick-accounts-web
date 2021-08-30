<template>
  <base-page>
    <h1 v-if="success">Your password was changed</h1>
    <h1 v-else>Reset Your Password</h1>
    <div v-if="error" class="f-row error">
      <v-icon name="circle-error-outline" class="mr-2"/>
      <p>Failed to set a new password</p>
    </div>
    <new-password-form
      v-if="!success"
      submit-text="Set password"
      :processing="processing"
      @submit="setPassword"
    />
  </base-page>
</template>

<script>
import VIcon from '@/ui/Icon.vue'
import BasePage from '@/BasePage.vue'
import NewPasswordForm from '@/components/NewPasswordForm.vue'

export default {
  components: {
    VIcon,
    BasePage,
    NewPasswordForm
  },
  data () {
    return {
      processing: false,
      success: false,
      error: null
    }
  },
  methods: {
    async setPassword (form) {
      // simple URL params parsing (even decoding is not needed) to avoid url polyfill
      const urlParams = {}
      location.search.substring(1).split('&').forEach(part => {
        const [name, value] = part.split('=')
        urlParams[name] = decodeURIComponent(value)
      })
      const { uid, token } = urlParams

      this.processing = true
      this.errorMsg = ''
      const response = await fetch(`/api/accounts/new_password/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      this.processing = false
      if (response.ok) {
        this.success = true
      } else {
        // const data = await response.json()
        // this.error = data.error || 'Failed to set a new password'
        this.error = true
      }
    }
  }
}
</script>
