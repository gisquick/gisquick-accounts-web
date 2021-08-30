<template>
  <base-page class="activation-page">

    <v-spinner v-if="processing"/>
    <template v-if="success">
      <h1>Your account was activated!</h1>
      <v-btn
        class="my-4"
        color="primary"
        :href="urlParams.portal || '/'"
      >
        Continue to homepage
      </v-btn>
    </template>

    <p v-if="error" class="error">
      There was a problem with activation of your account!
    </p>

  </base-page>
</template>

<script>
import BasePage from '@/BasePage.vue'
import VBtn from '@/ui/Button.vue'
import VSpinner from '@/ui/Spinner.vue'

export default {
  components: {
    BasePage,
    VBtn,
    VSpinner
  },
  data () {
    return {
      processing: false,
      error: null,
      success: false
    }
  },
  computed: {
    urlParams () {
      const urlParams = {}
      location.search.substring(1).split('&').forEach(part => {
        const [name, value] = part.split('=')
        urlParams[name] = decodeURIComponent(value)
      })
      return urlParams
    }
  },
  created () {
    this.activate()
  },
  methods: {
    async activate () {
      const { uid, token } = this.urlParams
      this.processing = true
      this.error = ''
      const response = await fetch(`/api/accounts/activate/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      this.processing = false
      if (response.ok) {
        this.success = true
      } else {
        this.success = false
        this.error = true
        // const data = await response.json()
        // this.error = data.error || 'Failed to activate account'
        // if (response.status === 400) {
        //   Object.keys(data).forEach(key => {
        //     if (this.validators[key]) {
        //       this.validators[key].error = data[key][0]
        //     }
        //   })
        // }
      }
    }
  }
}
</script>
